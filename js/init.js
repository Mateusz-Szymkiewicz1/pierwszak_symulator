(function () {
    const file = window.localStorage.getItem("preferences");
    const file2 = JSON.parse(file);
    if(file2){
        if(file2.scale){
            document.querySelector(".game-container").style.transform = `scale(${file2.scale}) translateY(39%)`
            window.scale = file2.scale;
        }
        if(file2.zoom){
            document.querySelector("canvas").style.transform = `scale(${file2.zoom})`
            window.zoom = file2.zoom;
        }
        if(file2.website_color){
            document.body.style.background = file2.website_color;
            window.website_color = file2.website_color;
        }
        if(file2.game_color){
            document.querySelector(".game-container").style.background = file2.game_color;
            window.game_color = file2.game_color;
        }
        if(file2.sfx_volume || file2.sfx_volume == 0){
            window.sfx_volume = file2.sfx_volume;
        }else{
            window.sfx_volume = 1;
        }
        if(file2.music_volume || file2.sfx_volume == 0){
            window.music_volume = file2.music_volume;
        }else{
            window.music_volume = 1;
        }
        if(file2.sans_mode){
            window.sans_mode = file2.sans_mode;
            if(window.sans_mode){
                document.querySelector("#audio_talking").src = "audio/talking2.mp3";
            }
        }else{
            window.sans_mode = false;
            document.querySelector("#audio_talking").src = "audio/talking.mp3";
        }
    }else{
        window.sans_mode = false;
        document.querySelector("#audio_talking").src = "audio/talking.mp3";
        window.music_volume = 1;
        window.sfx_volume = 1;
        window.game_color = "#202020";
        window.website_color = "#fff";
        window.scale = 2.5;
        window.zoom = 1;
    }
  const overworld = new Overworld({
    element: document.querySelector(".game-container")
  });
  overworld.init();
})();