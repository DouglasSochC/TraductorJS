import { Request, Response } from "express";
import { AnalizarJava } from './Analisis';
import { GenerarGrafo } from './Analisis';

export function analisis(codigo){
    //let respuesta = codigo;
    let respuesta = AnalizarJava(codigo);
    //console.log(respuesta);
    //console.log("params: ",req.params)
    //let a = [{'analisis': respuesta}, {'grafo': 'reporteAST'}, {'errores': 'reporteErrores'}]
    //Respuesta que se esta enviando al servidor del cliente...
    return respuesta;
}

export function grafo(codigo){
    //let respuesta = codigo;
    let respuesta = GenerarGrafo(codigo);
    //console.log(respuesta);
    //console.log("params: ",req.params)
    //let a = [{'analisis': respuesta}, {'grafo': 'reporteAST'}, {'errores': 'reporteErrores'}]
    //Respuesta que se esta enviando al servidor del cliente...
    return respuesta;
}
