class Relations{
    add_said(npc, index){
        window.NPCs.find(x=> x.id === npc).talking.splice(index, 1);
        window.relations_obj[npc].said.push(index)
    }  
    add_relationship(npc,value){
        window.relations_obj[npc].relationship = window.relations_obj[npc].relationship+value;
    }
    load_relations(){
        Object.keys(window.relations_obj).forEach(npc => {
            window.relations_obj[npc].said.forEach(index => {
                if(window.NPCs.find(x=> x.id === npc).talking[index]){
                    window.NPCs.find(x=> x.id === npc).talking.splice(index, 1);
                }
            })
        })
    }
   async init() {
       window.relations_obj = {};
       window.NPCs.forEach(npc => {
           let obj = {};
           obj.relationship = 50;
           obj.said = [];
           window.relations_obj[npc.id] = obj;
       })
   }
}