import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Equipamentos } from 'src/app/model/equipamentos';
import { EquipamentosService } from 'src/app/services/equipamentos.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { async } from '@angular/core/testing';
import { element } from 'protractor';
import { Area } from 'src/app/model/area';

@Component({
  selector: 'app-relatorio-equipamentos',
  templateUrl: './relatorio-equipamentos.page.html',
  styleUrls: ['./relatorio-equipamentos.page.scss'],
})
export class RelatorioEquipamentosPage implements OnInit {
 private equipamentoSubscrible:Subscription;
 public equipamentos = new Array<Equipamentos>();
 listaequipamento:Observable<Equipamentos[]>
 ordemList: any = []
tempodeParada: any=[]
silosList: any=[];
pinturaList: any=[];
corteList: any=[];
pmanualList: any=[];
laserList: any=[];
list5000: any=[];
list1000: any=[];
perfilList: any=[]; 
pendList: any=[];
  silosId: string;
  pinturaId: string;
  corteId: string;
  List: any=[];
  pmanualId: string
  laserId: string;
  id5000: string;
  id1000: string;
  perfilId: string;
  pendId: string;
  valor:number=9;
 dispCorteDobra: number;
//// variaveis para receber valor de disponibilidade de cada area 
  dispLaser: number;
  dispSilos: number;
  dispPintA:number;
  dispPintM: number;
  dispPul5: number;
  dispPul1: number;
  dispPerfil: number;
  dispPend:number;
  teste: any[];
;
  variavel:any;


  constructor(
    private equipServise: EquipamentosService,
    private db: AngularFirestore,

  ) 
  { 
    this.equipamentoSubscrible = this.equipServise.getEquipamentos().subscribe(data =>{
      this.equipamentos = data;
    })
    this.carregadados();


  }

  ngOnInit() {
    this.carregaAreas();
    // this.equipamentoSubscrible.unsubscribe();
  }

  // listarMensagens(){

  //   this.listaequipamento=this.db.collection<Equipamentos>("Mensagens",ref=>{
  //     return ref.limit(200).orderBy("tempo")///  ordena mensagens por dada e limida em 10 
  //   }).valueChanges()// altera o conteudo dianamicamente 
  
  //   this.listaequipamento.subscribe(res=>
  //     {
  //       this.filtarLista(res)
  //     })
  // }


 carregadados() {
    let lista=this.db.collection<Equipamentos>("Equipamentos")
   
     lista.ref.orderBy("tempo", "desc").get().then( async res =>{
      
     await res.forEach(doc => {
        this.ordemList.push(doc.data())
        console.log(doc.id, ' => ' , doc.data())
      
      });

      //  lista=this.db.collection<Equipamentos>("Equipamentos")
   
      // lista.ref.where("setor","==", "Silos").get().then( async r =>{
       
      // await r.forEach(doc => {
      //    this.ordemList.push(doc.data())
      //    console.log(doc.id, ' => ' , doc.data())
    
      //  });

      // r.forEach(element =>{
     
      //   this.teste = element.data().disponibilidade.toFixed(2)
       

      //   console.log("teste Array " + this.teste)
      // })
    })

    
    
  // }

     }
  carregaAreas(){

    // this.limpaListas();
      let lista=this.db.collection<Area>("Area")
      lista.ref.where("descricao", "==", "Corte e Dobra").get().then(res =>{
       res.forEach(doc => {
         this.corteList.push(doc.data())
         console.log(doc.id, ' => ' , doc.data())
         this.corteId = doc.id;
         console.log( this.corteId)  
       });
       res.forEach(element =>{
        this.dispCorteDobra = element.data().tempoPorEquip.toFixed(2);
        console.log("teste elemento disponibilidade corte e dobra " + this.dispCorteDobra )
       })

     })
     lista.ref.where("descricao", "==", "Laser").get().then(res =>{
       res.forEach(doc =>{
         this.laserList.push(doc.data())
         console.log(doc.id, ' => ', doc.data())
         this.laserId = doc.id;
         console.log( this.laserId)  
         
       })
       res.forEach(element =>{
        this.dispLaser = element.data().tempoPorEquip.toFixed(2);
        console.log("teste elemento disponibilidade Laser " + this.dispLaser )
       })
     })
    
     lista.ref.where("descricao", "==", "Silos").get().then(res =>{
      res.forEach(doc =>{
        this.silosList.push(doc.data())
        console.log(doc.id, ' => ', doc.data())
        this.silosId= doc.id;
        console.log( this.silosId)  
      });
      res.forEach(element =>{
        this.dispSilos = element.data().tempoPorEquip.toFixed(2);
        console.log("teste elemento disponibilidade Silos " + this.dispSilos )
       })
    })
    
    lista.ref.where("descricao", "==", "Pintura Automática").get().then(res =>{
      res.forEach(doc =>{
        this.pinturaList.push(doc.data())
        console.log(doc.id, ' => ', doc.data())
        this.pinturaId= doc.id;
        console.log( this.pinturaId)  
      })
      res.forEach(element =>{
        this.dispPintA = element.data().tempoPorEquip.toFixed(2);
        console.log("teste elemento disponibilidade Pintura Automatica " + this.dispPintA )
       })
    })
    
    lista.ref.where("descricao", "==", "Pintura Manual").get().then(res =>{
      res.forEach(doc =>{
        this.pmanualList.push(doc.data())
        console.log(doc.id, ' => ', doc.data())
        this.pmanualId= doc.id;
        console.log( this.pmanualId)  
      });
      res.forEach(element =>{
        this.dispPintM = element.data().tempoPorEquip.toFixed(2);
        console.log("teste elemento disponibilidade Pintura Manual" + this.dispPintM )
       })
    })
    
    lista.ref.where("descricao", "==", "Puncionadeira5000").get().then(res =>{
      res.forEach(doc =>{
        this.list5000.push(doc.data())
        console.log(doc.id, ' => ', doc.data())
        this.id5000= doc.id;
        console.log( this.id5000)  
      });
      res.forEach(element =>{
        this.dispPul5 = element.data().tempoPorEquip.toFixed(2);
        console.log("teste elemento disponibilidade Pulcionadeira5000 " + this.dispPul5 )
       })
    })
    
    lista.ref.where("descricao", "==", "Puncionadeira1000").get().then(res =>{
      res.forEach(doc =>{
        this.list1000.push(doc.data())
        console.log(doc.id, ' => ', doc.data())
        this.id1000= doc.id;
        console.log( this.id1000)  
      });
      res.forEach(element =>{
        this.dispPul1 = element.data().tempoPorEquip.toFixed(2);
        console.log("teste elemento disponibilidade Pulcionadeira1000 " + this.dispPul1 )
       })
    })
    
    lista.ref.where("descricao", "==", "Corte Perfil").get().then(res =>{
      res.forEach(doc =>{
        this.perfilList.push(doc.data())
        console.log(doc.id, ' => ', doc.data())
        this.perfilId= doc.id;
        console.log( this.perfilId)     
      });
      res.forEach(element =>{
        this.dispPerfil = element.data().tempoPorEquip.toFixed(2);
        console.log("teste elemento disponibilidade corte Perfil " + this.dispPerfil )
       })
    })
    
    lista.ref.where("descricao", "==", "Penddinghaus").get().then(res =>{
      res.forEach(doc =>{
        this.pendList.push(doc.data())
        console.log(doc.id, ' => ', doc.data())
        this.pendId= doc.id;
        console.log( this.pendId)  
      });
      res.forEach(element =>{
        this.dispPend = element.data().tempoPorEquip.toFixed(2);
        console.log("teste elemento disponibilidade Penddinghaus " + this.dispPend )
       })
    })
    }
}