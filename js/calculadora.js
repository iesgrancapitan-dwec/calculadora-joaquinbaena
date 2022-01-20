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
        crearBoton: (valor) =>{
            const boton = document.createElement("button");
            boton.innerHTML = valor;
            boton.addEventListener("click", calculadora.comportamiento(valor));
            return boton;
        },
        comportamiento: (valor) =>{
            if(/[1-9]/.test(valor)){
                return () =>{
                    if(calculadora.reset){
                        calculadora.display.value = valor;
                        calculadora.reset = false;
                    }else{
                        calculadora.display.value += valor;
                    }
                }
            }

            switch(valor){
                case "0":
                    return () =>{
                        if(!calculadora.reset){
                            calculadora.display.value += valor;
                        }
                    }
                case ".":
                    return () =>{
                        if(!calculadora.display.value.includes(".")){
                            calculadora.display.value += valor;
                            calculadora.reset = false;
                        }
                    }
                case "←":
                    return () =>{
                        calculadora.display.value = calculadora.display.value.slice(0,-1);
                        if(calculadora.display.value === ""){
                            calculadora.display.value = "0";
                            calculadora.reset = true;
                        }
                    }
                case "CE":
                    return () =>{
                        calculadora.display.value = "0";
                        calculadora.reset = true;
                    }
                case "±":
                    return () =>{
                        if(!calculadora.display.value.includes("-") && calculadora.display.value !== "0"){
                            calculadora.display.value = "-" + calculadora.display.value;
                        }else if(calculadora.display.value.includes("-") && calculadora.display.value !== "0"){
                            calculadora.display.value = calculadora.display.value.substr(1);
                        }
                    }
                case "=":
                    return () =>{
                        calculadora.valor2 = calculadora.display.value;
                        if(calculadora.suma){
                            calculadora.display.value = parseFloat(calculadora.valor1) + parseFloat(calculadora.valor2);
                            calculadora.suma = false;
                        }
                        if(calculadora.resta){
                            calculadora.display.value = parseFloat(calculadora.valor1) - parseFloat(calculadora.valor2);
                            calculadora.resta = false;
                        }
                        if(calculadora.div){
                            calculadora.display.value = parseFloat(calculadora.valor1) / parseFloat(calculadora.valor2);
                            calculadora.div = false;
                        }
                        if(calculadora.mul){
                            calculadora.display.value = parseFloat(calculadora.valor1) * parseFloat(calculadora.valor2);
                            calculadora.mul = false;
                        }
                        if(calculadora.modulo){
                            calculadora.display.value = parseFloat(calculadora.valor1) % parseFloat(calculadora.valor2);
                            calculadora.modulo = false;
                        }
                    }
                default:
                    return () =>{
                        calculadora.valor1 = calculadora.display.value;
                        if(valor === "+"){
                            calculadora.suma = true;
                            calculadora.reset = true;
                        }
                        if(valor === "-"){
                            calculadora.resta = true;
                            calculadora.reset = true;
                        }
                        if(valor === "/"){
                            calculadora.div = true;
                            calculadora.reset = true;
                        }
                        if(valor === "x"){
                            calculadora.mul = true;
                            calculadora.reset = true;
                        }
                        if(valor === "%"){
                            calculadora.modulo = true;
                            calculadora.reset = true;
                        }
                    }
                }
        },
        init: () =>{
            return document.addEventListener("DOMContentLoaded", () =>{
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
            });
        }
    }
    calculadora.init();
}
