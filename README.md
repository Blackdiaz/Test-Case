# Test-Case
Test Case - Employees List

Ejercicio técnico - Lista de empleados:

1.- Crear una tabla que muestre todas las propiedades de los empleados
cumpliendo las siguientes características:
• El salario está en pesos mexicanos
• Mostrar el salario en formato de dinero, es decir 16900 se muestra
como $ 16,900.00.
• Si el salario tuviera decimales se deben mostrar limitados a 2 decimales,
es decir 16900.333 se debe mostrar como $ 16,900.33.
2.- Adicionalmente en la tabla se debe de poder:
• Agregar empleados (Un botón al principio o final de la tabla).
• Editar empleados (Un botón al principio o final de la tabla).
• El nombre de la empresa no se debe poder modificar.
• Agregar un botón que muestre los salarios en USD, tipo de cambio de US
$1 = MXN $21.50.
3.- Se debe conservar en un estado (desplegado en una cabecera):
• Total de empleados
• Si se están mostrando los salarios con MXN o USD

4.- Poder filtrar empleados con un campo que permita buscar a los empleados
por nombre y empresa:
• El mismo campo debe funcionar para nombre y empresa.
• Se deben actualizar los resultados conforme se vayan escribiendo.

5.- La tabla debe contener las siguientes características, algunas necesitarán
agregar clases con CSS:
• Las filas deben de alternar el color del fondo
• Al hacer hover en una fila debe cambiar el color del fondo

• Los montos deben ir alineados a la derecha
• Los caracteres de los montos deben estar monoespaciado
• Si el salario es menor a 10,000 mostrarlo en color rojo, si es mayor
mostrarlo en color verde
• Los botones de texto (como agregar nuevo empleado o imprimir a
consola) deben tener fondo transparente y tener texto y borde en color
verde.
• Al hacer hover deben de poner su color de fondo con el mismo color del
borde y el texto pasa a ser color blanco, esto debe tener una transición.

6.- Agregar una columna donde se muestre una captura de una imagen para
cada uno de los empleados:
• Debe poderse elegirse un empleado y poder capturar un foto con la
herramienta de RecordRTC.
• Debe permitir compatibildad con el navegador.
• La imagen debe guardarse de forma local y aparecer en el renglón del
empleado elegido en la tabla.
