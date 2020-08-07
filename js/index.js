/*
* index.js
* @desc: Programa que realiza la cotización de equipos para la empresa Dentadec, con posibilidad de exportación a PDF
* @author: Jovanny Ulloa
* @version: 1.1
* @date: 03-05-2020
*/

$(document).ready(function(){

	function formatearMonto(monto) {
    	return monto.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

	let cotizaPesos = 0;
	var porcentajeDescuento = 0;
	var tipoEquipo = 0;
	var montoProm = 0;

	$("input[name='pesosMXN']").change(function(){
		if($("input[name='pesosMXN']:checked").val()){
			cotizaPesos = 1;
			$("#valorDolar").css("display","block");
		}else{
			$("#valorDolar").css("display","none");
			cotizaPesos = 0;
		}
	});
	
	$("input[name='tipo']").change(function(){
		tipoEquipo = $("input[name='tipo']:checked").val();
		if(tipoEquipo == "precioPromocional"){
			$("#montoProm").css("display","block");
		}else{
			$("#montoProm").css("display","none");
		}
	});

	$("#reiniciar").click(function(){
		$("#nombreCliente").val("");
		$("#descripcion").val("");
		$("#precio").val("");
		$("#anticipo").val("");
		$("input[name='tipo']").prop('checked', false);
		$("input[name='tipo']").prop('checked', false);
		$("#datosCotizacion").css("display","none");
		$("#imprimir").css("display","none");
	});

	$("#cotizar").click(function(){

		let cliente 		= $("#nombreCliente").val();
		let descripcion 	= $("#descripcion").val();
		let precioLista 	= $("#precio").val();
		let anticipo 		= $("#anticipo").val();
		let dolar 			= 1;
		
		/* Validar entrada de datos */
		if(cliente.length == 0 || descripcion.length == 0 || precioLista.length == 0 || anticipo.length == 0 || !$("input[name='tipo']:checked").val()){
			alert("Los campos no están completos");
		}
		else{
			if(!precioLista.match(/^\d+(\.\d{1,2})?$/i)){
				alert("El precio de lista sólo permite números y hasta 2 decimales");
				$("#precio").val("");
			}
			if(!anticipo.match(/^\d+(\.\d{1,2})?$/i)){
				alert("El anticipo sólo permite números y hasta 2 decimales");
				$("#precio").val("");
			}

			/* Validar la entrada del valor de dólar en pesos MXN */
			if(cotizaPesos == 1){
				if($("#dolar").val() == ""){
					alert("No has ingresado el valor del dólar en pesos");
				}
				dolar = $("#dolar").val();
				if(!dolar.match(/^\d+(\.\d{1,2})?$/i)){
					alert("El valor del dólar sólo permite números y hasta 2 decimales");
					$("#dolar").val("");
				}
			}
			console.log("Dólar :"+dolar);

			/* Validar la entrada del porcentaje promocional */
			if(tipoEquipo == "precioPromocional"){
				montoProm = $("#montoValor").val();
				if(montoProm.length == 0){
					alert("No has ingresado el porcentaje promocional");
				}
				if(!montoProm.match(/^\d+(\.\d{1,2})?$/i)){
					alert("El precio promocional sólo permite números y hasta 2 decimales");
					$("#montoValor").val("");
				}
			}
			console.log("Porcentaje promoción "+montoProm);

			$("#datosCotizacion").css("display","inline"); // TABLA DE COTIZACIÓN
			$("#campoNombreCliente").html(cliente);
			$("#campoDescripcion").html(descripcion);

			/* Aplicamos el descuento correspondiente */
			if(tipoEquipo == "hiTech"){
				$("#campoTipoEquipo").html("Hi-Tech");
				if(precioLista > 120001){
					alert("Hi Tech Descuento 10%");
					porcentajeDescuento =  10.00;
				}
				if(precioLista >= 80001 && precioLista <= 120000){
					alert("Hi Tech Descuento 7.5%");
					porcentajeDescuento = 7.50;
				}
				if(precioLista >= 40001 && precioLista <= 80000){
					alert("Hi Tech Descuento 5%");
					porcentajeDescuento = 5.00;
				}
				if(precioLista >= 1 && precioLista <= 40000){
					alert("Hi Tech Descuento 2.5%");
					porcentajeDescuento = 2.50;
				}
			}
			if(tipoEquipo == "otros"){
				$("#campoTipoEquipo").html("Otros");
				if(precioLista > 80001){
					alert("Otros-Descuento 12.5%");
					porcentajeDescuento = 12.50
				}
				if(precioLista >= 40001 && precioLista <= 80000){
					alert("Otros-Descuento 10%");
					porcentajeDescuento = 10.00
				}
				if(precioLista >= 20001 && precioLista <= 40000){
					alert("Otros-Descuento 7.5%");
					porcentajeDescuento = 7.50
				}
				if(precioLista >= 10001 && precioLista <= 20000){
					alert("Otros-Descuento 5%");
					porcentajeDescuento = 5.00
				}
				if(precioLista >= 5001 && precioLista <= 10000){
					alert("Otros-Descuento 2.5%");
					porcentajeDescuento = 2.50
				}
				if(precioLista >= 1 && precioLista <= 5000){
					alert("Otros-Descuento 0%");
					porcentajeDescuento = 0.00
				}
			}
			if(tipoEquipo == "precioPromocional"){
				$("#campoTipoEquipo").html("Descuento promocional");
				porcentajeDescuento = montoProm;
				alert("Promocional "+porcentajeDescuento+"%");
			}

			var precioEquipoCIVA       = Math.round(precioLista*1.16);
			var precioEquipoCDescuento = Math.round(precioEquipoCIVA-precioEquipoCIVA*(porcentajeDescuento/100));
			var descuentoTotal         = Math.round(precioEquipoCIVA-precioEquipoCDescuento);
			
			/* Conversión del precio de lista del equipo */
			if(dolar != 1){
				precioEquipoCIVA 		= (precioEquipoCIVA*dolar).toFixed(2);
				precioEquipoCDescuento 	= (precioEquipoCDescuento*dolar).toFixed(2);
				descuentoTotal 			= (descuentoTotal*dolar).toFixed(2);
			}

			let añosRenta = ["1","2","3","4"];
			let tasa 				= 23.00; 	// Tasa de interés
			let seguroFinanciado	= 1.00/100;	// Seguro Financiado
			let comisionApertura	= 3.00/100;	// Comisión de Apertura
			let tipoCambioDolarGen 	= 22.00; 	//Tipo de cambio genérico

			$("#campoDescuento").html(formatearMonto(porcentajeDescuento));
			$("#precioEquipoConIVA").html(formatearMonto(precioEquipoCIVA));
			$("#precioEquipoCDescuento").html(formatearMonto(precioEquipoCDescuento));
			$("#descuentoTotal").html(descuentoTotal);

			/* Inicializar montos base */
			var montoEquiposIVA		= 0;
			var montoArrendarcIVA 	= 0;
			var montoArrendarsIVA	= 0;
			var convertAnticipo		= 0;

			/* Asignamos valores de montos base*/
			montoEquiposIVA = precioLista*dolar
			$("#getDolar").val(dolar);
			$("#getAnticipo").val(anticipo);
			$("#montoEquipoIVA").val(precioLista*dolar);

			/* Conversión del anticipo */
			if(dolar == 1){
				$("#convertAnticipo").val((anticipo/tipoCambioDolarGen).toFixed(2));
			}else{
				$("#convertAnticipo").val(anticipo);
			}
			convertAnticipo = $("#convertAnticipo").val();

			/* Monto a arrendar con IVA / sin IVA */
			montoArrendarcIVA = (($("#montoEquipoIVA").val()*1.16-($("#montoEquipoIVA").val()*1.16*(porcentajeDescuento/100)))-$("#convertAnticipo").val()).toFixed(2);
			$("#anticipoRentas").html($("#convertAnticipo").val());
			$("#montoArrendarcIVA").html(formatearMonto(montoArrendarcIVA));
			montoArrendarsIVA =	montoArrendarcIVA/1.16;

			/* Valor $ de comisión de Apertura & seguro Financiado */
			var comAperturaDesg   = ($("#montoEquipoIVA").val()-$("#montoEquipoIVA").val()*(porcentajeDescuento/100))*comisionApertura;
			var segFinanciadoDesg = ((($("#montoEquipoIVA").val()-$("#montoEquipoIVA").val()*(porcentajeDescuento/100))*seguroFinanciado)/12).toFixed(2);
			console.log(comAperturaDesg);
			console.log(segFinanciadoDesg);

			let i = 0;
			var rentaMensual = 0;
			var co = montoArrendarsIVA; // Monto a arrendar sin IVA
			let m = 12; 				// Pagos Anuales
			let valorResidualsIVA  = 5/100;
			let valorResidualIVA   = 5/100;
			var valorResidualsIVADesg = 0;
			var valorResidualIVADesg  = 0;
			var im = tasa/m/100; 		// Tipo de interés fraccionado (del periodo)
			var im2 = 0;
			var rentaMensualsIVA = 0; 	// Renta mensual sin IVA
			var arrRentasMensuales = [];
			var arrIVAPagoMensual  = [];
			var arrConvertAntic	   = [];
			var arrSubTotalPagoI   = [];
			var arrSubTotalPagoIVA = [];

			/* Cuota Capital + intereses = Función PAGO (EXCEL) */
			for(i=0;i<añosRenta.length;i++){
				rentaMensual = 0;
				im2 = Math.pow((1 + im), -(m * añosRenta[i]));
				rentaMensual = (co * im) / (1 - im2); // Cuota Cap. + Int.
				rentaMensualsIVA = rentaMensual.toFixed(2);
				arrRentasMensuales.push(rentaMensualsIVA);
			}

			/* Tabla Pago Mensual */
			$(".pagoMensual").each(function(index){
  				$(this).html(arrRentasMensuales[index]);
			});
			$(".segFinanciado").each(function(index){
  				$(this).html(segFinanciadoDesg);
			});
			$(".iva").each(function(index){
				arrIVAPagoMensual.push((parseFloat(arrRentasMensuales[index])+parseFloat(segFinanciadoDesg))*0.16);
  				$(this).html(((parseFloat(arrRentasMensuales[index])+parseFloat(segFinanciadoDesg))*0.16).toFixed(2));
			});
			$(".pagoMensualTotal").each(function(index){
  				$(this).html((parseFloat(arrRentasMensuales[index])+parseFloat(segFinanciadoDesg)+parseFloat(arrIVAPagoMensual[index])).toFixed(2));
			});

			/* Tabla Pago Inicial */
			$(".estudioViabilidad").each(function(index){
				$(this).html(formatearMonto(comAperturaDesg));
			});
			$(".anticRentas").each(function(index){
				$(this).html((convertAnticipo/1.16).toFixed(2));
				arrConvertAntic.push((convertAnticipo/1.16).toFixed(2));
			});
			$(".primeraRenta").each(function(index){
				$(this).html(formatearMonto(parseFloat(arrRentasMensuales[index])));
			});
			$(".seguroFinanciado").each(function(index){
				$(this).html(parseFloat(segFinanciadoDesg));
			});
			$(".sub").each(function(index){
				$(this).html(formatearMonto((parseFloat(comAperturaDesg)+parseFloat(arrConvertAntic[index])+parseFloat(arrRentasMensuales[index])+parseFloat(segFinanciadoDesg)).toFixed(2)));
				arrSubTotalPagoI.push((parseFloat(comAperturaDesg)+parseFloat(arrConvertAntic[index])+parseFloat(arrRentasMensuales[index])+parseFloat(segFinanciadoDesg)).toFixed(2));
			});
			$(".ivaSub").each(function(index){
				$(this).html(formatearMonto(((parseFloat(comAperturaDesg)+parseFloat(arrConvertAntic[index])+parseFloat(arrRentasMensuales[index])+parseFloat(segFinanciadoDesg))*0.16).toFixed(2)));
				arrSubTotalPagoIVA.push(((parseFloat(comAperturaDesg)+parseFloat(arrConvertAntic[index])+parseFloat(arrRentasMensuales[index])+parseFloat(segFinanciadoDesg))*0.16).toFixed(2));
			});
			$(".totalPagoI").each(function(index){
				$(this).html(formatearMonto((parseFloat(arrSubTotalPagoI[index])+parseFloat(arrSubTotalPagoIVA[index])).toFixed(2)));
			});

			/* Tabla Cálculo Valor Residual Equipo */
			valorResidualsIVADesg = (((montoEquiposIVA-montoEquiposIVA*(porcentajeDescuento/100))*valorResidualsIVA)/1.16).toFixed(2);
			$(".valorResidual").html(valorResidualsIVA*100);
			$(".valorComercial").html(formatearMonto(valorResidualsIVADesg));
			
			/* Tabla Arrendamiento Puro*/
			var pagoMensualAux 	  	= (parseFloat(arrRentasMensuales[0])+parseFloat(segFinanciadoDesg)+parseFloat(arrIVAPagoMensual[0])).toFixed(2);
			var pagoInicialTotalAux = (parseFloat(arrSubTotalPagoI[0])+parseFloat(arrSubTotalPagoIVA[0])).toFixed(2);
			var totalMensualidades  = (parseFloat(pagoMensualAux)*(12-1)).toFixed(2);
			var pagoTotal 			= (parseFloat(totalMensualidades)+parseFloat(pagoInicialTotalAux)).toFixed(2);
			var interesesTotales	= 0;
			var interesTotalPagado  = 0;
			var interesMensual		= 0;
			var interesAnual		= 0;

			if((pagoTotal-precioEquipoCIVA) > 0){
				interesesTotales = (pagoTotal-precioEquipoCIVA).toFixed(2);
			}
			if(pagoTotal >= precioEquipoCIVA){
				interesTotalPagado = ((interesesTotales/precioEquipoCIVA)*100).toFixed(2);
			}

			interesMensual =  ((interesTotalPagado/12)).toFixed(2);
			interesAnual   =  ((interesMensual*12)).toFixed(2);

			$(".pagoMensualTotal2").html(formatearMonto(pagoMensualAux));
			$(".totalMensualidades").html(formatearMonto(totalMensualidades));
			$(".pagoInicial").html(formatearMonto(pagoInicialTotalAux));
			$(".pagoTotal").html(formatearMonto(pagoTotal));
			$(".interesesTotales").html(formatearMonto(interesesTotales));
			$(".interesesTotalPagado").html(interesTotalPagado);
			$(".interesMensual").html(interesMensual);
			$(".interesAnual").html(interesAnual);
			$("#imprimir").css("display","inline");
		}
	});

	$("#imprimir").click(function(){

		var elemento = document.getElementById('datosCotizacion');
		html2pdf(elemento);
     
	});
	
});	
