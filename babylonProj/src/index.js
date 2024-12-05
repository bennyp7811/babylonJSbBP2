const Engine = () => import('@babylonjs/core');
const createStartScene = () => import('./createStartScene');
import './main.css';
const CanvasName = "renderCanvas";
let canvas = document.createElement("canvas");
canvas.id = CanvasName;
canvas.classList.add("background-canvas");
document.body.appendChild(canvas);
let eng;
Engine().then((engineModule) => {
    eng = new engineModule.Engine(canvas, true, {}, true);
    let startScene;
    createStartScene().then((sceneModule) => {
        startScene = sceneModule.default(eng);
        eng.runRenderLoop(() => {
            startScene.scene.render();
        });
    });
});
