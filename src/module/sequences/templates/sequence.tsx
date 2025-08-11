"use client";

import { useEffect, useRef, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check } from "lucide-react"; 

type StyleType = "cartoon" | "ribbon" | "stick" | "sphere";

export default function ProteinViewerPage() {
  const viewerRef = useRef<HTMLDivElement>(null);
  const viewerInstance = useRef<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [style, setStyle] = useState<StyleType>("cartoon");
  const [modelLoaded, setModelLoaded] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || typeof window === "undefined" || !window.$3Dmol) {
      setError("3Dmol.js not loaded.");
      return;
    }
    setError(null);

    const reader = new FileReader();
    reader.onload = function (e) {
      const pdbData = e.target?.result;
      if (typeof pdbData !== "string") {
        setError("Invalid file content.");
        return;
      }

      try {
        if (!viewerInstance.current) {
          viewerInstance.current = window.$3Dmol.createViewer(viewerRef.current!, {
            backgroundColor: "transparent",
          });
        }

        const viewer = viewerInstance.current;
        viewer.clear();
        viewer.addModel(pdbData, "pdb");
        applyStyle(viewer, style);
        viewer.zoomTo();
        viewer.render();

        setModelLoaded(true);
      } catch (err) {
        console.error("3Dmol.js error:", err);
        setError("Error rendering the PDB structure.");
      }
    };
    reader.readAsText(file);
  };

  const applyStyle = (viewer: any, style: StyleType) => {
    viewer.setStyle({}, {}); // clear previous styles
    switch (style) {
      case "cartoon":
        viewer.setStyle({}, { cartoon: { color: "spectrum" } });
        break;
      case "ribbon":
        viewer.setStyle({}, { cartoon: { color: "spectrum", ribbon: true } });
        break;
      case "stick":
        viewer.setStyle({}, { stick: { colorscheme: "greenCarbon" } });
        break;
      case "sphere":
        viewer.setStyle({}, { sphere: { radius: 1.5, color: "red" } });
        break;
    }
    viewer.render();
  };

  useEffect(() => {
    if (modelLoaded && viewerInstance.current) {
      applyStyle(viewerInstance.current, style);
    }
  }, [style, modelLoaded]);

  const resetView = () => {
    if (viewerInstance.current) {
      viewerInstance.current.zoomTo();
      viewerInstance.current.rotate(0, 0, 0);
      viewerInstance.current.render();
    }
  };

  const styleLabels: Record<StyleType, string> = {
    cartoon: "Cartoon",
    ribbon: "Ribbon",
    stick: "Stick",
    sphere: "Sphere",
  };

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Protein Viewer</h1>

      <input
        type="file"
        accept=".pdb"
        onChange={handleFileUpload}
        className="mb-4 block"
      />

      {modelLoaded && (
        <div className="mb-4 flex items-center gap-4">
          <label className="font-semibold">Style:</label>

          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex items-center justify-center rounded border border-gray-300 bg-white px-3 py-1 text-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
              {styleLabels[style]}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-40">
              {(Object.keys(styleLabels) as StyleType[]).map((key) => (
                <DropdownMenuItem
                  key={key}
                  onSelect={() => setStyle(key)}
                  className="flex items-center justify-between"
                >
                  {styleLabels[key]}
                  {style === key && <Check className="h-4 w-4 text-blue-500" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <button
            onClick={resetView}
            className="ml-auto rounded bg-blue-600 px-3 py-1 text-white hover:bg-blue-700"
          >
            Reset View
          </button>
        </div>
      )}

      {error && <p className="mb-4 text-red-500">{error}</p>}

      <div
        ref={viewerRef}
        className="relative h-[500px] w-full overflow-hidden border border-gray-300 bg-white"
      />
    </div>
  );
}
