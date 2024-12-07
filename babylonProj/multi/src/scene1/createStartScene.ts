import {
  Scene,
  ArcRotateCamera,
  Vector3,
  HemisphericLight,
  MeshBuilder,
  Mesh,
  Light,
  Camera,
  Engine,
  StandardMaterial,
  Color3,
  CubeTexture,
  Texture,
  ActionManager,
  ExecuteCodeAction,
} from "@babylonjs/core";

function createSky(scene: Scene) {
  const skybox = MeshBuilder.CreateBox("skyBox", { size: 150 }, scene);
  const skyboxMaterial = new StandardMaterial("skyBox", scene);
  skyboxMaterial.backFaceCulling = false;
  skyboxMaterial.reflectionTexture = new CubeTexture(
    "./assets/textures/skybox/skybox",
    scene
  );
  skyboxMaterial.reflectionTexture.coordinatesMode =
    Texture.SKYBOX_MODE;
  skyboxMaterial.diffuseColor = new Color3(0, 0, 0);
  skyboxMaterial.specularColor = new Color3(0, 0, 0);
  skybox.material = skyboxMaterial;
  return skybox;
}

function createBox(scene: Scene) {
  let box = MeshBuilder.CreateBox("box", { size: 1 }, scene);
  box.position.y = 0.5;
  
  const boxMaterial = new StandardMaterial("boxMaterial", scene);
  boxMaterial.diffuseColor = new Color3(1, 0, 1); 
  box.material = boxMaterial;

  return box;
}

function createGround(scene: Scene) {
  let ground = MeshBuilder.CreateGround(
    "ground",
    { width: 20, height: 20 },
    scene,
  );

  const groundMaterial = new StandardMaterial("groundMaterial", scene);
  groundMaterial.diffuseColor = new Color3(2, 3, 3); 
  ground.material = groundMaterial;

  return ground;
}

function createLight(scene: Scene) {
  const light = new HemisphericLight("light", new Vector3(1, 1, 0), scene);
  light.intensity = 0.3;
  return light;
}


function createArcRotateCamera(scene: Scene) {
  let camAlpha = -Math.PI / 2,
    camBeta = Math.PI / 2.5,
    camDist = 10,
    camTarget = new Vector3(0, 0, 0);
  let camera = new ArcRotateCamera(
    "camera1",
    camAlpha,
    camBeta,
    camDist,
    camTarget,
    scene,
  );
  camera.attachControl(true);
  return camera;
}

export default function createStartScene(engine: Engine) {
  interface SceneData {
    scene: Scene;
    box?: Mesh;
    light?: Light;
    ground?: Mesh;
    sky?: Mesh;
    camera?: Camera;
  }

  let that: SceneData = { scene: new Scene(engine) };
  

  that.box = createBox(that.scene);
  that.light = createLight(that.scene);
  that.ground = createGround(that.scene);
  that.camera = createArcRotateCamera(that.scene);
  that.sky = createSky(that.scene);

  const inputMap: { [key: string]: boolean } = {};

  that.scene.actionManager = new ActionManager(that.scene);
  that.scene.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnKeyDownTrigger, (evt) => {
    inputMap[evt.sourceEvent.key] = true;
  }));
  that.scene.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnKeyUpTrigger, (evt) => {
    inputMap[evt.sourceEvent.key] = false;
  }));

  that.scene.onBeforeRenderObservable.add(() => {
    if (that.box) {
      if (inputMap["w"]) {
        that.box.position.z -= 0.1;
      }
      if (inputMap["s"]) {
        that.box.position.z += 0.1;
      }
      if (inputMap["a"]) {
        that.box.position.x -= 0.1;
      }
      if (inputMap["d"]) {
        that.box.position.x += 0.1;
      }
    }
  });

  return that;

  
}


