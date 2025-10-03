  // Definimos los datos dinámicos
    const opciones = {
      casa: {
        "Áreas Comunes": ["Comedor", "Cocina", "Dormitorios", "Baños", "Recibidor", "Pasillos", "Lavadero", "Vestidor", "Oficina", "Trastero", "Terraza"],
        "Áreas Exclusivas de Casa": ["Sala de estar", "Despensa", "Cuarto de juegos", "Jardín", "Garaje", "Ático"],
        "Áreas Exclusivas de Departamento": ["Balcón", "Estacionamiento"]
      },
      negocio: {
        "Áreas Comunes de Negocios": ["Zona de comedor", "Barra", "Recepción", "Terraza", "Baños clientes", "Área de lavado", "Cámaras frigoríficas", "Oficina administrativa", "Vestuarios", "Salida de residuos", "Recepción mercancías", "Almacén general"],
        "Zonas Exclusivas de Restaurantes": ["Cocina caliente", "Cocina fría", "Área de emplatado", "Almacén alimentos", "Almacén limpieza", "Área de descanso personal"],
        "Zonas Exclusivas de Panadería": ["Atención cliente", "Exhibición", "Caja", "Amasado", "Fermentación", "Horneado", "Enfriamiento", "Decoración y empaque", "Almacén materias primas"],
        "Zonas Exclusivas de Bares": ["Área de espera", "Pista de baile", "Cabina DJ", "Cocina bar", "Almacén bebidas", "Carga/descarga"]
      },
      oficina: {
        "Áreas Comunes de Oficinas": ["Recepción", "Sala de espera", "Oficina administrativa", "Reuniones", "Conferencias", "Área de copiado", "Cocina", "Baños personal", "Baños visitantes", "Sala descanso", "Trastero", "Archivo", "Estacionamiento", "Carga/descarga"],
        "Consultorio Médico": ["Consultorio", "Sala exploración", "Procedimientos menores", "Historial clínico", "Limpieza y desinfección", "Almacén insumos médicos", "Residuos biológicos"],
        "Bufete de Abogados": ["Despachos", "Biblioteca jurídica"],
        "Empresas": ["Oficinas individuales", "Trabajo compartido", "Dirección/Gerencia", "Recursos Humanos", "Contable", "Comercial", "Marketing", "Sistemas"]
      }
    };

    // Función para llenar dinámicamente los selects
    function cargarOpciones(idSelect, data) {
      const select = document.getElementById(idSelect);
      select.innerHTML = '<option value="" disabled selected>-- Seleccione área --</option>';
      for (const grupo in data) {
        const optgroup = document.createElement("optgroup");
        optgroup.label = grupo;
        data[grupo].forEach(area => {
          const option = document.createElement("option");
          option.value = area.toLowerCase().replace(/\s+/g, "_");
          option.textContent = area;
          optgroup.appendChild(option);
        });
        select.appendChild(optgroup);
      }
    }

    // Llenar selects
    cargarOpciones("area_casa", opciones.casa);
    cargarOpciones("area_negocio", opciones.negocio);
    cargarOpciones("area_oficina", opciones.oficina);

    // Lógica del envío
    document.getElementById("solicitudForm").addEventListener("submit", function(e) {
      e.preventDefault();

      const nombre = document.getElementById("nombre").value;
      const email = document.getElementById("contactoEmail").value;
      const telefono = document.getElementById("contactoTelefono").value;
      const detalles = document.getElementById("descripcionAdicional").value;
      const areaCasa = document.getElementById("area_casa").value;
      const areaNegocio = document.getElementById("area_negocio").value;
      const areaOficina = document.getElementById("area_oficina").value;

      const mensaje = `
Cliente: ${nombre}
Email: ${email}
Teléfono: ${telefono}
Detalles: ${detalles}
Área Casa: ${areaCasa}
Área Negocio: ${areaNegocio}
Área Oficina: ${areaOficina}
      `;

      // Mailto
      window.location.href = `mailto:tuemail@ejemplo.com?subject=Solicitud de Presupuesto&body=${encodeURIComponent(mensaje)}`;

      // WhatsApp (cambia el número por el tuyo con código de país)
      const numeroWhatsApp = "34123456789"; 
      const whatsappURL = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
      window.open(whatsappURL, "_blank");
    });