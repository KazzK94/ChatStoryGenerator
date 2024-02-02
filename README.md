# Chat Story Generator
Chat Story Generator (o CSG) es un generador de conversaciones fake de chat, con una sintaxis de entrada muy sencilla de usar sin necesidad de conocimientos técnicos.

Entra en https://chat-story-generator.netlify.app/ para empezar a usarlo

## Modo de uso
Para hacer uso del programa, sigue los siguientes pasos:

### Rellenar los campos necesarios
Completa los campos de la izquierda. El campo del protagonista es opcional, y lo único que hará es colocar a ese personaje en la parte derecha del chat y darle el color verde a su nombre cuando se cargue el texto en el chat (si colocas al protagonista después de convertir en chat tendrás que darle de nuevo al botón de Convertir para que se asigne el color del nombre de protagonista). Si dejas en blanco el nombre del grupo e intentas generar la imagen, recibirás un error.

#### Campos configurables
Existe un campo configurable para determinar la altura del chat. Los cambios en este campo se reflejarán de inmediato en el chat.
Como pequeño matiz, la altura por defecto es 700, y el valor se mide en píxeles. Además, esa altura es sólo la de la parte de la conversación en sí; la cabecera (donde están la imagen del grupo y el nombre del grupo) va a parte, la cual tiene una altura fija de 72px.

Si en lugar de ajustar la altura quieres que se vea toda la conversación en una sola imagen, clica la opción de "Mostrar conversación completa (máxima altura)" y se ajustará la altura de forma dinámica según el contenido.

### Convertir a Chat	
Pulsa el botón azul de "Convertir a chat" (este paso es fundamental, ya que el programa saca un "pantallazo" de lo que se ve en ese momento en el chat, y si el chat de la derecha está vacío saldrá un chat en blanco en la imagen).

#### Errores de sintaxis
Se añadirá que salte una alerta cuando se intente convertir un chat con errores de sintaxis.

### Exportar a Imagen
Finalmente, ya con el chat en la preview del lado derecho, simplemente pulsa el botón de "Exportar a imagen". La imagen se generará abajo del todo (tendrás que hacer scroll hacia abajo para verla). Si quieres guardar la imagen, haz clic derecho sobre ella y "Guardar imagen como..."

En caso de generar una imagen errónea, puedes mantener pulsada la tecla Ctrl y hacer doble click sobre la imagen para eliminarla (recuerda que las imágenes aparecen en la parte inferior, y que el lado derecho de la parte superior sólo es una preview del resultado final).

## Modo Desarrollador (sólo para desarrolladores)
Para quien necesite los datos en formato JSON, puede activar el modo desarrollador clicando 7 veces sobre el título de la página. Saltará un alert indicando que ya se ha habilitado el Modo Desarrollador. Ahora, haciendo scroll a la parte más baja de la página, se podrá ver el JSON Output correspondiente a la historia que se ha cargado. Esta información se actualiza al pulsar el botón "Convertir a Chat".

Para los no desarrolladores, no hay problema si activáis este modo, pero no creo que entendáis ni papa xD.


## Ideas de cara a futuro

### Resolver Bugs

#### Deformación en la imagen si no es cuadrada
El estilo de "object-fit: cover" no se aplica correctamente en el canvas, por lo que la imagen queda deformada.

### Funcionalidades Adicionales de Exportar Imagen (automatizadas)
Se pretende mover el botón de "Exportar a imagen" junto a los otros dos botones, aunque éste alineado a la derecha.

También se añadirán dos nuevas comprobaciones, en este orden:
	1) La primera comprobación consisitirá en asegurarse de que hay contenido en el chat (lado derecho) y, en caso de no haberlo, sugerirá al usuario hacer la conversión en ese momento automáticamente. 
	2) La segunda comprobación alertará al usuario de los errores de sintaxis, si los hubiera, y le dará la opción de reconsiderar si quiere o no hacer la exportación (en caso de exportar con errores, las líneas con error de sintaxis se ignorarán por completo mientras que el resto de líneas se mostrarán en el chat normalmente).

### Personalización Avanzada
En el futuro se añadirán nuevas opciones de personalización (como cambiar el fondo del chat, el color de la cabecera del mismo, la fuente del título y de los textos, los tamaños, etc.). Al tratarse de muchas opciones, y para no saturar la ventana principal, estas se recogerán en una ventana modal que se mostrará al pulsar en un icono de engranaje que quedará en el bloque de la izquierda, alineado en el punto superior derecho (aproximadamente a la izquierda de la parte alta del chat).

### Manual de Instrucciones
Se ha considerado añadir una UI mostrando un manual de instrucciones para usar el CSG con todas sus funcionalidades. Se colocaría un botón en alguna parte visible e intuitiva de la UI (por decidir), que abriría una ventana modal mostrando todas las funcionalidades disponibles en el programa.

### Rediseño de la UI (de cara a futuro)
Se ha pensado en tener varias pestañas para el contenido principal de la página, mostando en la pestaña principal los campos de entrada de texto (lado izquierdo) y la preview (lado derecho) además de los errores de sintaxis, y en una segunda pestaña todas las imágenes que se han generado en base a las exportaciones a imagen.

#### Boto del texto de ejemplo
Se reubicará este botón a un lugar en el que quede más claro que no es una funcionalidad principal del programa.

#### Estilos
Se pretende modificar los estilos para que resulten en una página más agradable a la vista.

#### Librerías de Terceros
Actualmente se utiliza Bootstrap, por herencia del proyecto base. Se pretende eliminar dicha dependencia por completo, para tener control total sobre los estilos de la página.

#### Reposicionamiento de los Errores de Sintaxis
Se está valorando cómo posicionar los errores de sintaxis de una manera que sean más visibles pero no molesten a la experiencia de usuario.
Todavía en fase de ideación, aún no se dispone de una idea clara para esto.

## Dedicatoria
Por supuesto, este proyecto va dedicado a Helen, con todo el cariño del mundo. ¡Un saludo para ti!
