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
  Texture,
  Color3,
  PointLight,
  SpotLight,
  Sound,
} from "@babylonjs/core";

function backgroundMusic(scene: Scene): Sound {
  let music = new Sound("music", "./assets/audio/rave.mp3", scene, null, {
    loop: true,
    autoplay: false,
  });

  scene.onBeforeRenderObservable.add(() => {
    if (!music.isPlaying) {
      music.play();
    }
  });

  scene.onDisposeObservable.add(() => {
    if (music.isPlaying) {
      music.stop();
    }
  });

  return music;
}

function createSphere2(scene: Scene) {
  let sphere = MeshBuilder.CreateSphere(
    "sphere",
    { diameter: 2, segments: 32 },
    scene
  );
  sphere.position.x = 3;
  sphere.position.y = 1;
  sphere.position.z = 1;

  var texture = new StandardMaterial("reflective", scene);
  texture.ambientTexture = new Texture("./assets/mface.jpg", scene);
  texture.diffuseColor = new Color3(1, 1, 1);
  sphere.material = texture;

  scene.registerBeforeRender(() => {
    const camera = scene.activeCamera;
    if (camera) {
      sphere.lookAt(camera.position);
    }
  });

  return sphere;
}

function createSpotLight(scene: Scene) {
  const light = new SpotLight("spotLight", new Vector3(5, 20, 10), new Vector3(-1, -2, -1), Math.PI / 3, 2, scene);
  light.intensity = 3;
  light.diffuse = new Color3(4, 0, 0);
  light.specular = new Color3(4, 0, 0);
  return light;
}

function createSpotLight2(scene: Scene) {
  const light = new SpotLight("spotLight2", new Vector3(5, 20, 10), new Vector3(-1, -2, -1), Math.PI / 3, 2, scene);
  light.intensity = 3;
  light.diffuse = new Color3(0, 0, 1);
  light.specular = new Color3(0, 0, 1);
  return light;
}

function animateLights(scene: Scene, light1: SpotLight, light2: SpotLight) {
  let light1Increasing = true;
  let light2Increasing = false;

  scene.onBeforeRenderObservable.add(() => {
    if (light1Increasing) {
      light1.intensity += 0.1; // Increased intensity change
      if (light1.intensity >= 4) { // Increased max intensity
        light1Increasing = false;
      }
    } else {
      light1.intensity -= 0.1; // Increased intensity change
      if (light1.intensity <= 0.1) {
        light1Increasing = true;
      }
    }

    if (light2Increasing) {
      light2.intensity += 0.1; // Increased intensity change
      if (light2.intensity >= 4) { // Increased max intensity
        light2Increasing = false;
      }
    } else {
      light2.intensity -= 0.1; // Increased intensity change
      if (light2.intensity <= 0.1) {
        light2Increasing = true;
      }
    }
  });
}

function createSphere(scene: Scene) {
  let sphere = MeshBuilder.CreateSphere(
    "sphere",
    { diameter: 2, segments: 32 },
    scene
  );
  sphere.position.y = 1;

  var texture = new StandardMaterial("reflective", scene);
  texture.ambientTexture = new Texture("./assets/monkey3.png", scene);
  texture.diffuseColor = new Color3(1, 1, 1);
  sphere.material = texture;

  scene.registerBeforeRender(() => {
    const camera = scene.activeCamera;
    if (camera) {
      sphere.lookAt(camera.position);
    }
  });

  return sphere;
}

function createGround(scene: Scene) {
  let ground = MeshBuilder.CreateGround(
    "ground",
    { width: 6, height: 6 },
    scene
  );
  return ground;
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
    scene
  );
  camera.attachControl(true);
  return camera;
}

export default function createStartScene(engine: Engine) {
  interface SceneData {
    scene: Scene;
    cylinder?: Mesh;
    light?: Light;
    sphere?: Mesh;
    Sphere2?: Mesh;
    ground?: Mesh;
    camera?: Camera;
    light2?: Light;
    music?: Sound;
  }

  let that: SceneData = { scene: new Scene(engine) };
  // that.scene.debugLayer.show();

  that.Sphere2 = createSphere2(that.scene);
  that.sphere = createSphere(that.scene);
  that.ground = createGround(that.scene);
  that.camera = createArcRotateCamera(that.scene);
  that.music = backgroundMusic(that.scene);
  const light1 = createSpotLight(that.scene);
  const light2 = createSpotLight2(that.scene);
  animateLights(that.scene, light1, light2);
  return that;
}
