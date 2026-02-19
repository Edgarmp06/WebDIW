<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = htmlspecialchars($_POST['nombre']);
    $email = htmlspecialchars($_POST['email']);
    $vehiculo = htmlspecialchars($_POST['vehiculo']);
    $tipo_servicio = $_POST['servicio'];
    $descripcion = htmlspecialchars($_POST['descripcion']);
    $fecha = date("d/m/Y");
    $numero_presupuesto = "TEC-" . rand(1000, 9999);
    $validez = date("d/m/Y", strtotime("+15 days"));
    $precios_base = [
        "mantenimiento" => ["horas" => 2, "tasa" => 45, "materiales" => 80],
        "reparacion" => ["horas" => 4, "tasa" => 50, "materiales" => 150],
        "tuning" => ["horas" => 6, "tasa" => 60, "materiales" => 300],
        "otros" => ["horas" => 1, "tasa" => 45, "materiales" => 0]
    ];
    $config = isset($precios_base[$tipo_servicio]) ? $precios_base[$tipo_servicio] : $precios_base["otros"];
    $subtotal_mano_obra = $config["horas"] * $config["tasa"];
    $subtotal_materiales = $config["materiales"];
    $total = ($subtotal_mano_obra + $subtotal_materiales) * 1.21; 
    $iva = $total - ($subtotal_mano_obra + $subtotal_materiales);
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Presupuesto Oficial - <?php echo $numero_presupuesto; ?></title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 40px; background: #f4f7f6; }
        .invoice-box { max-width: 800px; margin: auto; padding: 30px; border: 1px solid #eee; box-shadow: 0 0 10px rgba(0, 0, 0, .15); background: #fff; border-radius: 8px; }
        .header { display: flex; justify-content: space-between; border-bottom: 2px solid #0c2461; padding-bottom: 20px; margin-bottom: 20px; }
        .logo { font-size: 28px; font-weight: bold; color: #0c2461; }
        .info { text-align: right; }
        .client-info { margin-bottom: 40px; }
        table { width: 100%; line-height: inherit; text-align: left; border-collapse: collapse; }
        table th { background: #0c2461; color: #fff; padding: 12px; }
        table td { padding: 12px; border-bottom: 1px solid #eee; }
        .total { margin-top: 30px; text-align: right; font-size: 1.2em; font-weight: bold; }
        .footer { margin-top: 50px; text-align: center; font-size: 12px; color: #777; border-top: 1px solid #eee; padding-top: 20px; }
        .back-btn { display: inline-block; margin-top: 20px; padding: 10px 20px; background: #ff9f1c; color: #fff; text-decoration: none; border-radius: 5px; }
        @media print { .back-btn { display: none; } body { background: #fff; padding: 0; } .invoice-box { box-shadow: none; border: none; } }
    </style>
</head>
<body>
    <div class="invoice-box">
        <div class="header">
            <div class="logo">TECOCHE</div>
            <div class="info">
                Presupuesto #: <?php echo $numero_presupuesto; ?><br>
                Fecha: <?php echo $fecha; ?><br>
                Válido hasta: <?php echo $validez; ?>
            </div>
        </div>
        <div class="client-info">
            <strong>CLIENTE:</strong><br>
            <?php echo $nombre; ?><br>
            <?php echo $email; ?><br>
            <strong>VEHÍCULO:</strong> <?php echo $vehiculo; ?>
        </div>
        <table>
            <thead>
                <tr>
                    <th>Concepto</th>
                    <th>Detalles</th>
                    <th>Estimado</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Mano de obra</td>
                    <td><?php echo $config["horas"]; ?> Horas (Especialista)</td>
                    <td><?php echo number_format($subtotal_mano_obra, 2, ',', '.'); ?> €</td>
                </tr>
                <tr>
                    <td>Repuestos y materiales</td>
                    <td>Estimación base para <?php echo ucfirst($tipo_servicio); ?></td>
                    <td><?php echo number_format($subtotal_materiales, 2, ',', '.'); ?> €</td>
                </tr>
                <tr>
                    <td>Descripción del cliente</td>
                    <td colspan="2"><em><?php echo $descripcion; ?></em></td>
                </tr>
            </tbody>
        </table>
        <div class="total">
            <p>Subtotal: <?php echo number_format($subtotal_mano_obra + $subtotal_materiales, 2, ',', '.'); ?> €</p>
            <p>IVA (21%): <?php echo number_format($iva, 2, ',', '.'); ?> €</p>
            <p style="font-size: 1.5em; color: #0c2461;">TOTAL ESTIMADO: <?php echo number_format($total, 2, ',', '.'); ?> €</p>
        </div>
        <div class="footer">
            <p>Este presupuesto es meramente informativo y está sujeto a cambios tras la inspección física del vehículo.</p>
            <p>Tecoche - Calle del Automóvil, 123, Manises, Valencia - tel: 96 394 78 04</p>
        </div>
        <center>
            <a href="javascript:window.print()" class="back-btn" style="background: #0c2461;">Imprimir presupuesto</a>
            <a href="../index.html" class="back-btn">Volver a la web</a>
        </center>
    </div>
</body>
</html>
<?php
} else {
    header("Location: ../index.html");
    exit();
}
?>

