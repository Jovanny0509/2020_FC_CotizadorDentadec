<!DOCTYPE html>
<html lang="en">
<head>
	<title>Cotizador Dentadec - Firma Car</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="author" content="Jovanny Ulloa">
  <link href="img/favicon.ico" rel="icon" type="image/x-icon"/>
	<link rel="stylesheet" type="text/css" href="css/bootstrap-4.0.0-css/bootstrap.css">
  <link rel="stylesheet" type="text/css" href=" css/styles.css">
</head>
<body>
  <nav class="navbar navbar-light d-flex justify-content-between text-center">
    <a class="navbar-brand text-left" href="www.firmacar.com">
      <img id="firmacarLogo" src="img/logof.png" width="220" height="80" alt="Firma Car">
    </a>
    <a class="navbar-brand text-right" href="wwww.dentadec.com">
      <img id="dentadecLogo" src="img/dentadec.png" width="200" height="100" alt="Dentadec">
    </a>
  </nav>
  <hr>
	<div class="container-fluid">
		<div class="row ">
			<div class="col-md-6 border-50">
        <h4 class="text-center">Datos de cotización</h4>
  			<div class="form-group">
    			<label for="nombreCliente">Cliente</label>
    			<input type="text" class="form-control" id="nombreCliente" placeholder="Nombre del cliente"/>
  			</div>
  			<div class="form-group">
    			<label for="descripcion">Descripción</label>
    			<textarea class="form-control" id="descripcion" placeholder="Descripción del equipo/producto"></textarea>
  			</div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="precio">Precio de lista</label>
            <input type="text" class="form-control" id="precio" placeholder="$ USD"/>
          </div>
          <div class="form-group col-md-6">
            <label for="anticipo">Anticipo (a rentas)</label>
            <input type="text" class="form-control" id="anticipo" placeholder="$ MXN + IVA"/>
          </div>
        </div>
        <h6>Tipo de equipo: </h6><br>
  			<div class="form-row text-center">
  				<div class="form-check col-md-4">
						<label class="form-check-label">
  						<input type="radio" class="form-check-input" name="tipo" value="hiTech">Hi-Tech
						</label>
				  </div>
				  <div class="form-check col-md-4">
						<label class="form-check-label">
							<input type="radio" class="form-check-input" name="tipo" value="otros">Otros
						</label>
				  </div>
				  <div class="form-check col-md-4">
						<label class="form-check-label">
							<input type="radio" id="precioProm" class="form-check-input" name="tipo" value="precioPromocional">Precio promocional
						</label>
				  </div>
  			</div>
        <br>
  			<div class="form-check text-center">
					<label class="form-check-label">
						<input type="checkbox" class="form-check-input" name="pesosMXN">Cotizar en pesos mexicanos
					</label>
        </div>
        <!--Campos dinámicos-->
        <div class="form-row">
          <div id="montoProm" class="form-group col-md-4" style="display: none;">
            <label for="montoValor">Porcentaje promocional</label>
            <input type="text" id="montoValor" class="form-control" placeholder="% promocional"/> 
          </div>
          <div id="valorDolar" class="form-group col-md-4" style="display: none;">
            <label for="dolar">Valor del dólar en pesos MXN</label>
            <input type="text" class="form-control" id="dolar" placeholder="$ MXN"/>
          </div>
        </div>
        <div class="text-center botones">
	  			<button id="cotizar" class="btn btn-danger">Cotizar</button>
          <button id="reiniciar" class="btn btn-danger">Reiniciar</button>
        </div>
      </div>
			<div class="col-md-6" class="tablaDescuentos">
        <h5 class="text-center">Descuentos<br>(Importes antes de IVA)</h5>
        <ul class="nav nav-tabs" id="tablaDescuentos" role="tablist">
          <li class="nav-item">
            <a class="nav-link active" id="hiTechTab" data-toggle="tab" href="#hit" role="tab" aria-controls="Hi-Tech" aria-selected="true">Hi-Tech</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" id="otrosTab" data-toggle="tab" href="#otr" role="tab" aria-controls="Otros" aria-selected="false">Otros</a>
          </li>
        </ul>
        <div class="tab-content" id="myTabContent">
          <div class="tab-pane fade show active" id="hit" role="tabpanel" aria-labelledby="Hi-Tech">
            <table class="table table-striped table-bordered">
              <thead class="thead-dark">
                <tr class="text-center">
                  <th>Monto ($USD)</th>
                  <th>Descuento (%)</th>
                </tr>
              </thead>
              <tbody>
                <tr class="text-center">
                  <td>$120,001 USD en adelante</td>
                  <td data-desc="10">10.00%</td>
                </tr>
                <tr class="text-center">
                  <td>$80,001 - $120,000 USD</td>
                  <td data-desc="7.5">7.5%</td>
                </tr>
                <tr class="text-center">
                  <td>$40,001 - $80,000 USD</td>
                  <td data-desc="5.00">5.00%</td>
                </tr>
                <tr class="text-center">
                  <td>$1 - $40,000 USD</td>
                  <td data-desc="2.5">2.5%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="tab-pane fade" id="otr" role="tabpanel" aria-labelledby="Otros">
            <table class="table table-striped table-bordered">
              <thead class="thead-dark text-center">
                <tr>
                  <th>Monto ($USD)</th>
                  <th>Descuento (%)</th>
                </tr>
              </thead>
              <tbody class="text-center">
                <tr class="text-center">
                  <td>$80,001 USD en adelante</td>
                  <td data-desc="12.50">12.50%</td>
                </tr>
                <tr class="text-center">
                  <td>$40,001 - $80,000 USD</td>
                  <td data-desc="10.00">10.00%</td>
                </tr>
                <tr class="text-center">
                  <td>$20,001 - $40,000 USD</td>
                  <td data-desc="7.50">7.50%</td>
                </tr>
                <tr class="text-center">
                  <td>$10,001 - $20,000 USD</td>
                  <td data-desc=5.00>5.00%</td>
                </tr>
                <tr class="text-center">
                  <td>$5,001 - $10,000 USD</td>
                  <td data-desc="2.50">2.50%</td>
                </tr>
                <tr class="text-center">
                  <td>$1 - $5,000 USD</td>
                  <td data-desc="0.00">0.00%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
			</div>
    </div>
    <div class="row ">
      <div class="col-md-12" id="datosCotizacion" style="display: none;">
        <div class="row ">
          <div class="col-md-1"></div>
          <div class="col-md-10">
            <!--Información general-->
            <table class="table thead-dark table-bordered table-striped table-hover">
              <thead class="thead-dark">
                  <th colspan="2" class="text-center">RESULTADO DE COTIZACIÓN</th>
              </thead>
              <tbody>
                <tr>
                  <td>Nombre del cliente</td>
                  <td id="campoNombreCliente"></td>
                </tr>
                <tr>
                  <td>Descripción del equipo</td>
                  <td id="campoDescripcion"></td>
                </tr>
                <tr>
                  <td>Tipo de equipo</td>
                  <td id="campoTipoEquipo"></td>
                </tr>
                <tr>
                  <td>Descuento (%)</td>
                  <td id="campoDescuento"></td>
                </tr>
                <tr>
                  <td>Precio de Lista del Equipo (incluye IVA)</td>
                  <td id="precioEquipoConIVA"></td>
                </tr>
                <tr>
                  <td>Precio del Equipo con Descuento (incluye IVA)</td>
                  <td id="precioEquipoCDescuento"></td>
                </tr>
                <tr>
                  <td>Descuento total</td>
                  <td id="descuentoTotal"></td>
                </tr>
                <tr>
                  <td>Anticipo a rentas</td>
                  <td id="anticipoRentas"></td>
                </tr>
                <tr>
                  <td>Monto a Arrendar (incluye IVA)</td>
                  <td id="montoArrendarcIVA"></td>
                </tr>
              </tbody>
            </table>
            <!--Rentas mensuales-->
            <table class="table table-bordered table-striped table-hover">
              <thead class="thead-dark">
                <tr>
                  <th>Rentas mensuales</th>
                  <th>12</th>
                  <th>24</th>
                  <th>36</th>
                  <th>48</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Pago mensual</td>
                  <td class="pagoMensual"></td>
                  <td class="pagoMensual"></td>
                  <td class="pagoMensual"></td>
                  <td class="pagoMensual"></td>
                </tr>
                <tr>
                  <td>Seguro financiado</td>
                  <td class="segFinanciado"></td>
                  <td class="segFinanciado"></td>
                  <td class="segFinanciado"></td>
                  <td class="segFinanciado"></td>
                </tr>
                <tr>
                  <td>I.V.A</td>
                  <td class="iva"></td>
                  <td class="iva"></td>
                  <td class="iva"></td>
                  <td class="iva"></td>
                </tr>
                <tr>
                  <td><b>Pago Mensual Total</b></td>
                  <td class="pagoMensualTotal"></td>
                  <td class="pagoMensualTotal"></td>
                  <td class="pagoMensualTotal"></td>
                  <td class="pagoMensualTotal"></td>
                </tr>
              </tbody>
            </table>
            <!--Pago Inicial-->
            <table class="table table-bordered table-striped table-hover">
              <thead class="thead-dark">
                <tr colspan="5">
                  <th colspan="5" class="text-center">Concepto inicial</th>
                </tr>
                <tr>
                  <th>Concepto</th>
                  <th>12</th>
                  <th>24</th>
                  <th>36</th>
                  <th>48</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Estudio de viabilidad de crédito ($)</td>
                  <td class="estudioViabilidad"></td>
                  <td class="estudioViabilidad"></td>
                  <td class="estudioViabilidad"></td>
                  <td class="estudioViabilidad"></td>
                </tr>
                <tr>
                  <td>Anticipo a Rentas ($)</td>
                  <td class="anticRentas"></td>
                  <td class="anticRentas"></td>
                  <td class="anticRentas"></td>
                  <td class="anticRentas"></td>
                </tr>
                <tr>
                  <td>Primera renta ($)</td>
                  <td class="primeraRenta"></td>
                  <td class="primeraRenta"></td>
                  <td class="primeraRenta"></td>
                  <td class="primeraRenta"></td>
                </tr>
                <tr>
                  <td>Seguro Financiado ($)</td>
                  <td class="seguroFinanciado"></td>
                  <td class="seguroFinanciado"></td>
                  <td class="seguroFinanciado"></td>
                  <td class="seguroFinanciado"></td>
                </tr>
                <tr>
                  <td><b>Subtotal ($)</b></td>
                  <td class="sub"></td>
                  <td class="sub"></td>
                  <td class="sub"></td>
                  <td class="sub"></td>
                </tr>
                <tr>
                  <td><b>IVA ($)</b></td>
                  <td class="ivaSub"></td>
                  <td class="ivaSub"></td>
                  <td class="ivaSub"></td>
                  <td class="ivaSub"></td>
                </tr>
                <tr>
                  <td><b>Total Pago Inicial ($)</b></td>
                  <td class="totalPagoI"></td>
                  <td class="totalPagoI"></td>
                  <td class="totalPagoI"></td>
                  <td class="totalPagoI"></td>
                </tr>
              </tbody>
            </table>
            <!--Cálculo del valor residual del equipo-->
            <table class="table table-bordered table-dark table-striped table-hover">
              <tbody>
                <tr>
                  <td class="text-center">Porcentaje del Valor Residual (%)</td>
                  <td class="valorResidual"></td>
                </tr>
                <tr>
                  <td class="text-center"><b>Valor comercial estimado al final del plazo sin IVA ($)</b></td>
                  <td class="valorComercial"></td>
                </tr>
              </tbody>
            </table>
            <!--Arrendamiento puro-->
            <table class="table table-bordered table-striped table-hover">
              <tbody>
                <tr>
                  <td>Pago Mensual Total ($)</td>
                  <td class="pagoMensualTotal2"></td>
                </tr>
                <tr>
                  <td>Total de Mensualidades ($)</td>
                  <td class="totalMensualidades"></td>
                </tr>
                <tr>
                  <td>Pago Inicial ($)</td>
                  <td class="pagoInicial"></td>
                </tr>
                <tr>
                  <td>Pago Total ($)</td>
                  <td class="pagoTotal"></td>
                </tr>
                <tr>
                  <td>Intereses Totales ($)</td>
                  <td class="interesesTotales"></td>
                </tr>
                <tr>
                  <td>Interés Total Pagado (%)</td>
                  <td class="interesesTotalPagado"></td>
                </tr>
                <tr>
                  <td>Interés Mensual (%)</td>
                  <td class="interesMensual"></td>
                </tr>
                <tr>
                  <td>Interés anual (%)</td>
                  <td class="interesAnual"></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="col-md-1" style="display: none;"></div>
          <input type="hidden" id="getDolar">
          <input type="hidden" id="getAnticipo">
          <input type="hidden" id="montoEquipoIVA">
          <input type="hidden" id="convertAnticipo">
        </div>
      </div>
    </div>
    <div class="row ">
      <div class="col-md-12 text-center">
          <button class="btn btn-warning" id="imprimir">Imprimir cotización</button>
      </div>
    </div>
	</div>  
	<script src="js/jquery-3.1.4.js"></script>
	<script src="js/bootstrap-4.0.0-js/bootstrap.js"></script>
  <script src="js/html2pdf.js"></script>
	<script src="js/index.js"></script>
</body>
</html>