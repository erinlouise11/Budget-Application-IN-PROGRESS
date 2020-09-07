let container, camera, renderer, scene;

function init(){

    container = document.getElementById('container');
    container.width = document.body.clientWidth; //document.width is obsolete
    container.height = document.body.clientHeight; //document.height is obsolete

    scene = new THREE.Scene();

    createCamera();
    createParticles();
    createRenderer();     

    renderer.setAnimationLoop(() => {
        render();
    });
}

function createRenderer() {

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(container.clientWidth, container.clientHeight);
  
    renderer.setPixelRatio(window.devicePixelRatio);
  
    // improving the color of the scene
    // renderer.gammaOutput = true;
  
    renderer.physicallyCorrectLights = true;
  
    // adding the renderer to the container
    container.appendChild(renderer.domElement);
}

function createCamera() {

    // creating the camera
    camera = new THREE.PerspectiveCamera(
  
      45, // FOV
      container.clientWidth / container.clientHeight, // aspect ratio
      0.1, // near clipping plane
      1000, // far clipping plane
    );
  
    camera.position.set(0, 3, 15);
  }

function createParticles(){

    // partice variables 
    let particleCount = 10000, 
    particles = new THREE.Geometry(), 
    pMaterial = new THREE.PointsMaterial({
        color: 0x599fe3, 
        size: 0.75,         
        transparent: true
    });   

    // create a particle with random
    // position values, -250 -> 250
    for(let i = 0; i < particleCount; i++){
        let pX = Math.random() * 500 - 250, pY = Math.random() * 500 - 250, pZ = Math.random() * 500 -250, 
        particle = new THREE.Vector3(pX, pY, pZ);
        particles.vertices.push(particle);
    }

    let particleSystem = new THREE.Points( //Points
        particles, 
        pMaterial
    );

    particleSystem.sortParticles = true;

    scene.add(particleSystem);
}

function render() {

    // making the camera look at the scene
    camera.lookAt(scene.position);
  
    // rendering the scene
    renderer.render(scene, camera);
  }

init();