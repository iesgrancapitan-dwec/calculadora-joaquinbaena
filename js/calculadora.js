/**
 * @author Joaquín Baena Salas
 */
{
    const calculadora = {
        display: undefined,
        reset: true,
        valor1: 0,
        valor2: 0,
        suma: false,
        resta: false,
        div: false,
        mul: false,
        modulo: false,
        valoresBotones: ["CE", "←", "%", "+",
                        "7", "8", "9", "-",
                        "4", "5", "6", "x",
                        "1", "2", "3", "/",
                        "0", "±", ".", "="],
        crearBoton: function(valor) {
            const boton = document.createElement("button");
            boton.innerHTML = valor;
            boton.addEventListener("click", this.comportamiento(valor));
            return boton;
        },
        comportamiento: function(valor) {
            if(/[1-9]/.test(valor)){
                return () =>{
                    if(this.reset){
                        this.display.value = valor;
                        this.reset = false;
                    }else{
                        this.display.value += valor;
                    }
                }
            }

            switch(valor){
                case "0":
                    return () =>{
                        if(!this.reset){
                            this.display.value += valor;
                        }
                    }
                case ".":
                    return () =>{
                        if(!this.display.value.includes(".")){
                            this.display.value += valor;
                            this.reset = false;
                        }
                    }
                case "←":
                    return () =>{
                        this.display.value = this.display.value.slice(0,-1);
                        if(this.display.value === "0" || this.display.value === ""){
                            this.display.value = "0";
                            this.reset = true;
                        }
                    }
                case "CE":
                    return () =>{
                        this.display.value = "0";
                        this.reset = true;
                    }
                case "±":
                    return () =>{
                        if(!this.display.value.includes("-") && this.display.value !== "0"){
                            this.display.value = "-" + this.display.value;
                        }else if(this.display.value.includes("-") && this.display.value !== "0"){
                            this.display.value = this.display.value.substr(1);
                        }
                    }
                case "=":
                    return () =>{
                        this.valor2 = this.display.value;
                        if(this.suma){
                            this.display.value = parseFloat(this.valor1) + parseFloat(this.valor2);
                            this.suma = false;
                        }
                        if(this.resta){
                            this.display.value = parseFloat(this.valor1) - parseFloat(this.valor2);
                            this.resta = false;
                        }
                        if(this.div){
                            this.display.value = parseFloat(this.valor1) / parseFloat(this.valor2);
                            this.div = false;
                        }
                        if(this.mul){
                            this.display.value = parseFloat(this.valor1) * parseFloat(this.valor2);
                            this.mul = false;
                        }
                        if(this.modulo){
                            this.display.value = parseFloat(this.valor1) % parseFloat(this.valor2);
                            this.modulo = false;
                        }
                    }
                default:
                    return () =>{
                        this.valor1 = this.display.value;
                        if(valor === "+"){
                            this.suma = true;
                            this.reset = true;
                        }
                        if(valor === "-"){
                            this.resta = true;
                            this.reset = true;
                        }
                        if(valor === "/"){
                            this.div = true;
                            this.reset = true;
                        }
                        if(valor === "x"){
                            this.mul = true;
                            this.reset = true;
                        }
                        if(valor === "%"){
                            this.modulo = true;
                            this.reset = true;
                        }
                    }
                }
        },
        init: () => {
            const caja = document.createElement("div");
            caja.style.display = "grid";
            caja.style.width = "300px";
            caja.style.height = "400px";
            caja.style.gridGap = "3px";
            caja.style.backgroundColor = "black";
            caja.style.padding = "4px";
            caja.style.gridTemplateColumns =  "repeat(4,1fr)";
            document.body.appendChild(caja);

            calculadora.display = document.createElement("input");
            calculadora.display.setAttribute("type", "text");
            calculadora.display.setAttribute("readonly", "true");
            calculadora.display.setAttribute("name", "display");
            calculadora.display.style.gridArea = "input";
            calculadora.display.style.fontSize = "20px";
            calculadora.display.style.textAlign = "right";
            calculadora.display.style.gridArea = "1/1/2/5";
            calculadora.display.value = "0";
            caja.appendChild(calculadora.display);

            calculadora.valoresBotones.forEach(element => {
                caja.appendChild(calculadora.crearBoton(element));
            });
        }
    }
    document.addEventListener("DOMContentLoaded",calculadora.init);
}
