

export class API{

     constructor(pais, departamento, ciudad){
        this.pais = pais;
        this.departamento = departamento;
        this.ciudad = ciudad;
     }

     ObtenerApi = async ()=>{

        const api = await fetch(`https://api.tomorrow.io/v4/weather/realtime?location=${this.pais}-${this.departamento}-${this.ciudad}&apikey=TA2ysL7sUpL3z7rzxvBxV6e4k59nJyrj`);
      //   const api = await fetch(`https://api.tomorrow.io/v4/weather/realtime?location=${this.pais}-${this.departamento}-${this.ciudad}&apikey=ZK43H1i44YfqeBLwzwDzIKgG0OJjHoSP`);
        const datosJson = await api.json();

        return datosJson;
     }



}