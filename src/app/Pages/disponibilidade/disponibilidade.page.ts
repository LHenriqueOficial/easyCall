import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Equipamentos } from 'src/app/model/equipamentos';
import { Area } from 'src/app/model/area';
import { EquipamentosService } from './../../services/equipamentos.service';
import { AreaService } from './../../services/area.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { NavController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-disponibilidade',
  templateUrl: './disponibilidade.page.html',
  styleUrls: ['./disponibilidade.page.scss'],
})
export class DisponibilidadePage implements OnInit {
equipamentoSubscription: Subscription;
areaSubscription: Subscription;
equipamentos = new Array<Equipamentos>();
areas = new  Array<Area>()
public silo: Area ={};
public pen:Area={};
public  lase: Area={};
public pul5:Area={};
public pul1:Area={};
public pintA:Area={};
public pintM:Area={};
public corted:Area={};
public cortef:Area={};
test:string ="aaaaaaaaaaa";

horasTrabalhadas: number;
diasTrabalhados: number;
qtdEquip: number;
tempoPorEquip:number;
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
  loading: HTMLIonLoadingElement;
  
  constructor(
    private equipService: EquipamentosService,
    private areaService: AreaService,
    private db: AngularFirestore,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private router: Router,
  ) {

     this.equipamentoSubscription= this.equipService.getEquipamentos().subscribe(data =>{
      this.equipamentos = data;
      
    });
   
    this.areaSubscription = this.areaService.getAreas().subscribe(data =>{
      this.areas = data;
    })

//  this.carregaAreas();
   }

  ngOnInit() {
    this.carregaAreas();
  }
  ngOnDestroy() {
    if (this.equipamentoSubscription) this.equipamentoSubscription.unsubscribe();
    if (this.areaSubscription) this.areaSubscription.unsubscribe();

  }

  showScreen(nomeDaPagina: string){
    this.navCtrl.navigateForward(nomeDaPagina)
  };


 async calcValor(id:string){
 
   if(id === this.laserId){
    Number(this.lase.disponibilidade = (this.lase.diasTrabalhados * this.lase.horasTrabalhadas * this.lase.qtdEquip *60  )).toFixed(2)
    Number(this.lase.tempoPorEquip = (this.lase.disponibilidade / this.lase.qtdEquip)).toFixed(2)
    await this.areaService.updateArea(id, this.lase)
    console.log("dias trabalahdos " + this.lase.diasTrabalhados) 
     console.log( "horas trabalhadas " + this.lase.horasTrabalhadas)  
     console.log("quantidade de equipamento " + this.lase.qtdEquip)
    console.log("disponibilidade "+ this.lase.disponibilidade)
    console.log("tempo por equipamento" + this.lase.tempoPorEquip)


   }if(id === this.id5000){

    Number(this.pul5.disponibilidade = (this.pul5.diasTrabalhados * this.pul5.horasTrabalhadas * this.pul5.qtdEquip *60  )).toFixed(2)
    Number(this.pul5.tempoPorEquip = (this.pul5.disponibilidade / this.pul5.qtdEquip)).toFixed(2)
    await this.areaService.updateArea(id, this.pul5)
    console.log("dias trabalahdos " + this.pul5.diasTrabalhados) 
     console.log( "horas trabalhadas " + this.pul5.horasTrabalhadas)  
     console.log("quantidade de equipamento " + this.pul5.qtdEquip)
    console.log("disponibilidade "+ this.pul5.disponibilidade)
    console.log("tempo por equipamento" + this.pul5.tempoPorEquip)

   }if(id === this.id1000){
    Number(this.pul1.disponibilidade = (this.pul1.diasTrabalhados * this.pul1.horasTrabalhadas * this.pul1.qtdEquip *60  )).toFixed(2)
    Number(this.pul1.tempoPorEquip = (this.pul1.disponibilidade / this.pul1.qtdEquip)).toFixed(2)
    await this.areaService.updateArea(id, this.pul1)
    console.log("dias trabalahdos " + this.pul1.diasTrabalhados) 
     console.log( "horas trabalhadas " + this.pul1.horasTrabalhadas)  
     console.log("quantidade de equipamento " + this.pul1.qtdEquip)
    console.log("disponibilidade "+ this.pul1.disponibilidade)
    console.log("tempo por equipamento" + this.pul1.tempoPorEquip)

   
   }
   if(id === this.pendId){
    Number(this.pen.disponibilidade = (this.pen.diasTrabalhados * this.pen.horasTrabalhadas * this.pen.qtdEquip *60  )).toFixed(2)
    Number(this.pen.tempoPorEquip = (this.pen.disponibilidade / this.pen.qtdEquip)).toFixed(2)
    await this.areaService.updateArea(id, this.pen)
    console.log("dias trabalahdos " + this.pen.diasTrabalhados) 
     console.log( "horas trabalhadas " + this.pen.horasTrabalhadas)  
     console.log("quantidade de equipamento " + this.pen.qtdEquip)
    console.log("disponibilidade "+ this.pen.disponibilidade)
    console.log("tempo por equipamento" + this.pen.tempoPorEquip)

   }
   if(id === this.silosId){
    Number(this.silo.disponibilidade = (this.silo.diasTrabalhados * this.silo.horasTrabalhadas * this.silo.qtdEquip *60  )).toFixed(2)
    Number(this.silo.tempoPorEquip = (this.silo.disponibilidade / this.silo.qtdEquip)).toFixed(2)
    await this.areaService.updateArea(id, this.silo)
    console.log("dias trabalahdos " + this.silo.diasTrabalhados) 
     console.log( "horas trabalhadas " + this.silo.horasTrabalhadas)  
     console.log("quantidade de equipamento " + this.silo.qtdEquip)
    console.log("disponibilidade "+ this.silo.disponibilidade)
    console.log("tempo por equipamento" + this.silo.tempoPorEquip)
   }
   if(id === this.pinturaId){
    Number(this.pintA.disponibilidade = (this.pintA.diasTrabalhados * this.pintA.horasTrabalhadas * this.pintA.qtdEquip *60  )).toFixed(2)
    Number(this.pintA.tempoPorEquip = (this.pintA.disponibilidade / this.pintA.qtdEquip)).toFixed(2)
    await this.areaService.updateArea(id, this.pintA)
    console.log("dias trabalahdos " + this.pintA.diasTrabalhados) 
     console.log( "horas trabalhadas " + this.pintA.horasTrabalhadas)  
     console.log("quantidade de equipamento " + this.pintA.qtdEquip)
    console.log("disponibilidade "+ this.pintA.disponibilidade)
    console.log("tempo por equipamento" + this.pintA.tempoPorEquip)
   }

   if(id === this.pmanualId){
    Number(this.pintM.disponibilidade = (this.pintM.diasTrabalhados * this.pintM.horasTrabalhadas * this.pintM.qtdEquip *60  )).toFixed(2)
    Number(this.pintM.tempoPorEquip = (this.pintM.disponibilidade / this.pintM.qtdEquip)).toFixed(2)
    await this.areaService.updateArea(id, this.pintM)
    console.log("dias trabalahdos " + this.pintM.diasTrabalhados) 
     console.log( "horas trabalhadas " + this.pintM.horasTrabalhadas)  
     console.log("quantidade de equipamento " + this.pintM.qtdEquip)
    console.log("disponibilidade "+ this.pintM.disponibilidade)
    console.log("tempo por equipamento" + this.pintM.tempoPorEquip)
   }

   if(id === this.corteId){
    Number(this.corted.disponibilidade = (this.corted.diasTrabalhados * this.corted.horasTrabalhadas * this.corted.qtdEquip *60  )).toFixed(2)
    Number(this.corted.tempoPorEquip = (this.corted.disponibilidade / this.corted.qtdEquip)).toFixed(2)
    await this.areaService.updateArea(id, this.corted)
    console.log("dias trabalahdos " + this.corted.diasTrabalhados) 
     console.log( "horas trabalhadas " + this.corted.horasTrabalhadas)  
     console.log("quantidade de equipamento " + this.corted.qtdEquip)
    console.log("disponibilidade "+ this.corted.disponibilidade)
    console.log("tempo por equipamento" + this.corted.tempoPorEquip)
   }

   if(id === this.perfilId){
    Number(this.cortef.disponibilidade = (this.cortef.diasTrabalhados * this.cortef.horasTrabalhadas * this.cortef.qtdEquip *60  )).toFixed(2)
    Number(this.cortef.tempoPorEquip = (this.cortef.disponibilidade / this.cortef.qtdEquip)).toFixed(2)
    await this.areaService.updateArea(id, this.cortef)
    console.log("dias trabalahdos " + this.cortef.diasTrabalhados) 
     console.log( "horas trabalhadas " + this.cortef.horasTrabalhadas)  
     console.log("quantidade de equipamento " + this.cortef.qtdEquip)
    console.log("disponibilidade "+ this.cortef.disponibilidade)
    console.log("tempo por equipamento" + this.cortef.tempoPorEquip)
    this.navCtrl.navigateBack('disponibilidade');

   }
       this.ngOnInit();

  }



carregaAreas(){
this.limpaListas();
  let lista=this.db.collection<Area>("Area")
  lista.ref.where("descricao", "==", "Corte e Dobra").get().then(res =>{
   res.forEach(doc => {
     this.corteList.push(doc.data())
     console.log(doc.id, ' => ' , doc.data())
     this.corteId = doc.id;
     console.log( this.corteId)  
     
   });
 })
 lista.ref.where("descricao", "==", "Laser").get().then(res =>{
   res.forEach(doc =>{
     this.laserList.push(doc.data())
     console.log(doc.id, ' => ', doc.data())
     this.laserId = doc.id;
     console.log( this.laserId)  
     
   })
 })

 lista.ref.where("descricao", "==", "Silos").get().then(res =>{
  res.forEach(doc =>{
    this.silosList.push(doc.data())
    console.log(doc.id, ' => ', doc.data())
    this.silosId= doc.id;
    console.log( this.silosId)  

  })
})

lista.ref.where("descricao", "==", "Pintura Automática").get().then(res =>{
  res.forEach(doc =>{
    this.pinturaList.push(doc.data())
    console.log(doc.id, ' => ', doc.data())
    this.pinturaId= doc.id;
    console.log( this.pinturaId)  
  })
})

lista.ref.where("descricao", "==", "Pintura Manual").get().then(res =>{
  res.forEach(doc =>{
    this.pmanualList.push(doc.data())
    console.log(doc.id, ' => ', doc.data())
    this.pmanualId= doc.id;
    console.log( this.pmanualId)  

  })
})

lista.ref.where("descricao", "==", "Puncionadeira5000").get().then(res =>{
  res.forEach(doc =>{
    this.list5000.push(doc.data())
    console.log(doc.id, ' => ', doc.data())
    this.id5000= doc.id;
    console.log( this.id5000)  

  })
})

lista.ref.where("descricao", "==", "Puncionadeira1000").get().then(res =>{
  res.forEach(doc =>{
    this.list1000.push(doc.data())
    console.log(doc.id, ' => ', doc.data())
    this.id1000= doc.id;
    console.log( this.id1000)  

  })
})

lista.ref.where("descricao", "==", "Corte Perfil").get().then(res =>{
  res.forEach(doc =>{
    this.perfilList.push(doc.data())
    console.log(doc.id, ' => ', doc.data())
    this.perfilId= doc.id;
    console.log( this.perfilId)  

  })
})

lista.ref.where("descricao", "==", "Penddinghaus").get().then(res =>{
  res.forEach(doc =>{
    this.pendList.push(doc.data())
    console.log(doc.id, ' => ', doc.data())
    this.pendId= doc.id;
    console.log( this.pendId)  

  })
})
}

async presentLoading() {
  this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
  return this.loading.present();
}

limpaListas(){
  this.silosList=[];
  this.pinturaList=[];
  this.corteList=[];
  this.pmanualList=[];
  this.laserList=[];
  this.list5000=[];
  this.list1000=[];
  this.perfilList=[]; 
  this.pendList=[];
}
}
