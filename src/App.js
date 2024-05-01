import React, { useState, useMemo } from "react";
import "./styles.css";
import { MarkersPlugin } from "@photo-sphere-viewer/markers-plugin";
import {
  ReactPhotoSphereViewer,
  LensflarePlugin,
} from "react-photo-sphere-viewer";
import "@photo-sphere-viewer/markers-plugin/index.css";

function App() {
  const [photoSrc, setPhotoSrc] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReady = (instance) => {
    const markersPlugs = instance.getPlugin(MarkersPlugin);
    if (!markersPlugs) return;
    console.log(markersPlugs);
    markersPlugs.addEventListener("select-marker", () => {
      console.log("asd");
    });
  };

  const plugins = useMemo(() => [
    [
      MarkersPlugin,
      {
        // list of markers
        markers: [
          {
            // image marker that opens the panel when clicked
            id: "image",
            position: { yaw: "95deg", pitch: "16deg" },
            image: "pin-red.png",
            anchor: "bottom center",
            size: { width: 32, height: 32 },
            tooltip: "Monte Civetta, Dolomites, Italy",
          },
        ],
      },
    ],
    [
      LensflarePlugin,
      {
        // list of lensflares
        lensflares: [
          {
            id: "sun",
            position: { yaw: "145deg", pitch: "2deg" },
            type: 0,
          },
        ],
      },
    ],
  ], []);

  return (
    <div className="App">
      <input type="file" onChange={handleFileChange} accept="image/*" />
      {photoSrc && (
        <ReactPhotoSphereViewer
          src={photoSrc}
          littlePlanet={true}
          lang={{
            littlePlanetButton: "Little Planet",
          }}
          hideNavbarButton={true}
          height={"100vh"}
          width={"100vw"}
          onReady={handleReady}
          plugins={plugins}
        />
      )}
    </div>
  );
}

export default App;
