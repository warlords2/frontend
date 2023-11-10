import Vue from 'vue';
import * as THREE from 'three';
import * as rest from './game/rest.client';

let plugin = {}; plugin.install = function (Vue, options) {
    
    var loader = new THREE.TextureLoader();
    var scopo = {
        world:{},
        width:256,
        height:256,
        sena:{},
        renderer:{},
        listener:{
            'onSelecionar':[]
        }
    };

    var build = function(canvas,  width, height, config){

        scopo.width  = width;
        scopo.height = height;

        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        var gameRender = canvas;

        const scene = new THREE.Scene();

        scene.background = new THREE.Color('#6BC5D0');
        
        scopo.sena = scene;

        const camera = new THREE.OrthographicCamera(
                    scopo.width / - 16,
                    scopo.width / 16,
                    scopo.height / 16,
                    scopo.height / - 16,
                    -100,
                    500 );

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize( scopo.width, scopo.height );
        scopo.renderer = renderer;
        gameRender.appendChild( renderer.domElement );

        camera.lookAt(scene.position);
        camera.rotation.x = 0.7;
        camera.rotation.y = 0.7;
        camera.rotation.z = 0.7;
        camera.position.z = 4.9;
        camera.position.y = -3.3;
        camera.position.x = 3.3;
        camera.zoom = 6.8;

        camera.updateProjectionMatrix();

        renderer.render( scene, camera );
        
        setInterval(function(){
            renderer.render( scene, camera );
        },60)



        let selection = (event,prioridade) => {

            var bounds = gameRender.getBoundingClientRect()
            mouse.x = ( (event.clientX - bounds.left) / gameRender.clientWidth ) * 2 - 1;
            mouse.y = - ( (event.clientY - bounds.top) / gameRender.clientHeight ) * 2 + 1;
            raycaster.setFromCamera( mouse, camera );
            var intersects = raycaster.intersectObjects(scene.children, true);

            let selecionado = {};
            if( intersects.length > 0) {

                selecionado = scopo.world[intersects[ 0 ].object.id]

                if(selecionado.entity.selecionavel){

                    selecionado.figure.material = MODEL.buildMaterialSelecionavel(selecionado.entity, loader, scopo)
                    
                } else {
                    if(intersects[0].distance < 5.39){

                        for(let intersec of intersects.splice(1)){

                            let selecionadoAtras = scopo.world[intersec.object.id];

                            if(selecionadoAtras.entity.selecionavel){
                                selecionadoAtras.figure.material = MODEL.buildMaterialSelecionavel(selecionadoAtras.entity, loader, scopo)
                                selecionado = selecionadoAtras;
                                break;
                            }
                        }
                    }
                }

                Object.keys(scopo.world).forEach(object=>{
                    let objeto = scopo.world[object];
                    if( objeto.entity.selecionavel &&
                        object != selecionado.figure.id){
                        objeto.figure.material = MODEL.buildMaterial(objeto.entity, loader, scopo);
                    }
                })

                scopo.listener['onSelecionar'].forEach(call=>call(selecionado,prioridade))

            // Limpando selecao
            }else Object.keys(scopo.world).forEach(object=>{

                let objeto = scopo.world[object];
                if(objeto.entity.selecionavel ){
                    objeto.figure.material = MODEL.buildMaterial(objeto.entity, loader, scopo);
                }

            })
        };

        gameRender.addEventListener('mouseover', (event)=>selection(event,1), false)
        gameRender.addEventListener( 'click', (event)=>selection(event,0), false)
        gameRender.addEventListener( 'mousemove', (event)=>selection(event,1), false)
        gameRender.addEventListener( 'resize',function(event){

        },true)

    };
    var getSeletion = function(){
        
    }
    
    Vue.prototype.$Game = {
        build,
        getSeletion,
        onSelecionar:function(listener){
            return scopo.listener['onSelecionar'].push(listener) - 1;
        },
        onSelecionarRemover:function(index){
            delete scopo.listener['onSelecionar'][index];
        },
        resize:function(width, height){
            scopo.width  = width;
            scopo.height = height;
            scopo.renderer.setSize( scopo.width, scopo.height );
        }
    };
}

Vue.use(plugin)