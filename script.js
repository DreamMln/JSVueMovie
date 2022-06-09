const baseUrl = "https://eksamenrepo.azurewebsites.net/api/movies"

// appen oprettes
const app = Vue.createApp({
    data() { // appens værdier defineres
        return {
            movies: [], //tomt array til at indeholde data omkring movies
            error: null,
            getMovieData: null,
            addData: {name:"", lengthInMinutes:"",countryOfOrigin:""},
            addMessage:"",
            idCooler:"",
            getMessage: "",
            addMessage1: "",
            filter: null,
            filter1: null,

                
        }
    },
    created() { // Livcyklus-metoder, der står inde i created(), 
        //bliver kaldt ved appens "fødsel", aka start, når programmet starter køre metoden
        this.getAllMovies()
    },
    methods: {
        getAllMovies(){
            this.getAllMoviesHelper(baseUrl)
        },
        async getAllMoviesHelper(url){ // helper-metode til at hente alle info om vind
            try { //fejlhåndtering
                const result = await axios.get(url) // axios laver http-request(get) til REST-service
                this.movies = result.data // her bliver det tomme array fyldt ud med data
                console.log(this.movies) // udskrift til konsollen
            } catch(ex) { //ex = exception
                alert(ex.message) //fejlmeddelelse i tilfælde af noget går galt
            }
        },
        async addMovies(){
            try{
                response= await axios.post(baseUrl, this.addData)
                this.addMessage="response " + response.status + " " + response.statusText
                this.getAllMovies() //opdatere listen direkte
            }catch(ex){
                alert(ex.message)
            }
        },
        //med filter https://eksamenrepo.azurewebsites.net/api/movies/120
        async getFilter(){ // helper-metode til at hente alle info om vind
            try { //fejlhåndtering
                //filteret tilføjer, ekstra på URL
                const result = await axios.get(baseUrl+"/search?lengthInMinutes="+this.filter) // axios laver http-request(get) til REST-service
                this.movies = result.data // her bliver det tomme array fyldt ud med data
                console.log(this.movies) // udskrift til konsollen
            } catch(ex) { //ex = exception
                alert(ex.message) //fejlmeddelelse i tilfælde af noget går galt
            }
        },
       /*async getByWineCoolerId(){
        const url = baseUrl + "/" + this.id
        try{
            const response = await axios.get(url)
            this.getWineData = response.data
            this.getMessage = response.status + " " + response.statusText
        }catch (ex) {
            alert(ex.message)
        }
        },
        
        async addWineCoolerLib(){
            const url = baseUrl + "/" + this.idCooler
            try{
                response= await axios.post(url)
                this.addMessage1="response " + response.status + " " + response.statusText
                this.getAllWines()
            }catch(ex){
                alert(ex.message)
            }
        },*/
    }

}).mount("#app") //her bliver appen mounted