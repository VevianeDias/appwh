(function($) {
	

	//INÍCIO CADASTRO CLIENTE
	  
		var operacao = "A"; 
	
		var indice_selecionado = -1;
	
		var tbClientes = localStorage.getItem("tbClientes");// Recupera os dados armazenados
	
		tbClientes = JSON.parse(tbClientes); // Converte string para objeto
	
		if(tbClientes == null) // Caso não haja conteúdo, iniciamos um vetor vazio
			tbClientes = [];
	
		function Adicionar(){
			var cli = GetCliente("Codigo", $("#txtCodigo").val());
	
			if(cli != null){
				alert("Código já cadastrado.");
				return;
			}
	
			var cliente = JSON.stringify({
				Codigo   : $("#txtCodigo").val(),
				Nome     : $("#txtNome").val(),
				Telefone : $("#txtTelefone").val(),
				Email    : $("#txtEmail").val()
			});
	
			tbClientes.push(cliente);
	
			localStorage.setItem("tbClientes", JSON.stringify(tbClientes));
	
			alert("Registro adicionado.");
			return true;
		}
	
		function Editar(){
			tbClientes[indice_selecionado] = JSON.stringify({
					Codigo   : $("#txtCodigo").val(),
					Nome     : $("#txtNome").val(),
					Telefone : $("#txtTelefone").val(),
					Email    : $("#txtEmail").val()
				});
			localStorage.setItem("tbClientes", JSON.stringify(tbClientes));
			alert("Informações editadas.")
			operacao = "A";
			return true;
		}
	
		function Listar(){
			$("#tblListar").html("");
			$("#tblListar").html(
				"<thead>"+
				"	<tr>"+
				"<th></th>"+
				"	<th>Código</th>"+
				"	<th>Nome</th>"+
				"	<th>Telefone</th>"+
				"	<th>Email</th>"+
				"	</tr>"+
				"</thead>"+
				"<tbody>"+
				"</tbody>"
				);
	
			 for(var i in tbClientes){
				var cli = JSON.parse(tbClientes[i]);
				  $("#tblListar tbody").append("<tr>"+
											  "	<td><img src='edit.png' alt='"+i+"' class='btnEditar'/><img src='delete.png' alt='"+i+"' class='btnExcluir'/></td>" + 
											 "	<td>"+cli.Codigo+"</td>" + 
											 "	<td>"+cli.Nome+"</td>" + 
											 "	<td>"+cli.Telefone+"</td>" + 
											 "	<td>"+cli.Email+"</td>" + 
											   "</tr>");
			 }
		}
	
		function Excluir(){
			tbClientes.splice(indice_selecionado, 1);
			localStorage.setItem("tbClientes", JSON.stringify(tbClientes));
			alert("Registro excluído.");
		}
	
		function GetCliente(propriedade, valor){
			var cli = null;
			for (var item in tbClientes) {
				var i = JSON.parse(tbClientes[item]);
				if (i[propriedade] == valor)
					cli = i;
			}
			return cli;
		}
	
		Listar();
	
		$("#frmCadastro").on("submit",function(){
			if(operacao == "A")
				return Adicionar();
			else
				return Editar();		
		});
	
		$("#tblListar").on("click", ".btnEditar", function(){
			operacao = "E";
			indice_selecionado = parseInt($(this).attr("alt"));
			var cli = JSON.parse(tbClientes[indice_selecionado]);
			$("#txtCodigo").val(cli.Codigo);
			$("#txtNome").val(cli.Nome);
			$("#txtTelefone").val(cli.Telefone);
			$("#txtEmail").val(cli.Email);
			$("#txtCodigo").attr("readonly","readonly");
			$("#txtNome").focus();
		});
	
		$("#tblListar").on("click", ".btnExcluir", function(){
			indice_selecionado = parseInt($(this).attr("alt"));
			Excluir();
			Listar();
		});
	
//FIM CADASTRO CLIENTE


//INÍCIO CADASTRO EXERCÍCIO
$(function(){

	var operacaoExe = "Ae"; 

	var indice_selecionadoExe = -1;

	var tbExercicios = localStorage.getItem("tbExercicios");// Recupera os dados armazenados

	tbExercicios = JSON.parse(tbExercicios); // Converte string para objeto

	if(tbExercicios == null) // Caso não haja conteúdo, iniciamos um vetor vazio
	tbExercicios = [];

	function AdicionarExe(){
		var exe = GetExercicio("TpExe", $("#txtTpExe").val());

		if(exe != null){
			alert("Exercício já cadastrado.");
			return;
		}

		var exercicio = JSON.stringify({
			TpExe   : $("#txtTpExe").val(),
			Serie     : $("#txtSerie").val(),
			Repeticoes : $("#txtRepeticoes").val(),
		});

		tbExercicios.push(exercicio);

		localStorage.setItem("tbExercicios", JSON.stringify(tbExercicios));

		alert("Exercício adicionado.");
		return true;
	}

	function EditarExe(){
		tbExercicios[indice_selecionadoExe] = JSON.stringify({
			TpExe   : $("#txtTpExe").val(),
			Serie     : $("#txtSerie").val(),
			Repeticoes : $("#txtRepeticoes").val(),
		});
		localStorage.setItem("tbExercicios", JSON.stringify(tbExercicios));
		alert("Exercícios alterados.")
		operacaoExe = "Ae";
		return true;
	}

	function ListarExe(){
		$("#tblListarExe").html("");
		$("#tblListarExe").html(
			"<thead>"+
			"	<tr>"+
			"<th></th>"+
			"	<th>Nome Exercício</th>"+
			"	<th>Qtd séries</th>"+
			"	<th>Repetições</th>"+
			"	</tr>"+
			"</thead>"+
			"<tbody>"+
			"</tbody>"
			);

		 for(var ie in tbExercicios){
			var exe = JSON.parse(tbExercicios[ie]);
		  	$("#tblListarExe tbody").append("<tr>"+
									 	 "	<td><img src='edit.png' alt='"+ie+
										  "' class='btnEditar'/><img src='delete.png' alt='"+ie+
										  "' class='btnExcluir'/></td>" + 
										 "	<td>"+exe.TpExe+"</td>" + 
										 "	<td>"+exe.Serie+"</td>" + 
										 "	<td>"+exe.Repeticoes+"</td>" + 
		  								 "</tr>");
		 }
	}

	function ExcluirExe(){
		tbExercicios.splice(indice_selecionadoExe, 1);
		localStorage.setItem("tbExercicios", JSON.stringify(tbExercicios));
		alert("Exercício excluído.");
	}

	function GetExercicio(propriedadeexe, valorexe){
		var exe = null;
        for (var itemexe in tbExercicios) {
            var ie = JSON.parse(tbExercicios[itemexe]);
            if (ie[propriedadeexe] == valorexe)
                exe = ie;
        }
        return exe;
	}

	ListarExe();

	$("#frmCadastroExe").on("submit",function(){
		if(operacaoExe == "Ae")
			return AdicionarExe();
		else
			return EditarExe();		
	});

	$("#tblListarExe").on("click", ".btnEditar", function(){
		operacaoExe = "Ee";
		indice_selecionadoExe = parseInt($(this).attr("alt"));
		var exe = JSON.parse(tbExercicios[indice_selecionadoExe]);
		$("#txtTpExe").val(exe.TpExe);
		$("#txtSerie").val(exe.Serie);
		$("#txtRepeticoes").val(exe.Repeticoes);
		$("#txtTpExe").attr("readonly","readonly");
		$("#txtTpExe").focus();
	});

	$("#tblListarExe").on("click", ".btnExcluir", function(){
		indice_selecionadoExe = parseInt($(this).attr("alt"));
		ExcluirExe();
		ListarExe();
	});
});
//FIM CADASTRO CLIENTE


//INÍCIO CALCULO IMC
 $('#botao').click(function () {
            var peso = $('#peso').val();
            var altura = $('#altura').val();
            var imc = peso / (altura * altura);
            var hr = $('<hr>');
            var spanIMC = $('<span>').text('IMC: ' + imc);
            $('#resultado').append(hr).append(spanIMC);
          });
//FIM CALCULO IMC


//INÍCIO METRICAS

$(function(){

	var operacaoMet = "Am"; 

	var indice_selecionadoMet = -1;

	var tbMetricas = localStorage.getItem("tbMetricas");// Recupera os dados armazenados

	tbMetricas = JSON.parse(tbMetricas); // Converte string para objeto

	if(tbMetricas == null) // Caso não haja conteúdo, iniciamos um vetor vazio
	tbMetricas = [];

	function AdicionarMet(){
		var met = GetMetricas("TpCod", $("#txtCod").val());

		if(met != null){
			alert("Exercício já cadastrado.");
			return;
		}

		var metricas = JSON.stringify({
			TpCod   : $("#txtCod").val(),
			Categoria     : $("#txtCategoria").val(),
			Tmp : $("#txtTmp").val(),
			Distancia : $("#txtDistancia").val(),
			Calorias : $("#txtCalorias").val(),
			
		});

		tbMetricas.push(metricas);

		localStorage.setItem("tbMetricas", JSON.stringify(tbMetricas));

		alert("Exercício adicionado.");
		return true;
	}

	function EditarMet(){
		tbMetricas[indice_selecionadoMet] = JSON.stringify({
			TpCod   : $("#txtCod").val(),
			Categoria     : $("#txtCategoria").val(),
			Tmp : $("#txtTmp").val(),
			Distancia : $("#txtDistancia").val(),
			Calorias : $("#txtCalorias").val(),
		});
		localStorage.setItem("tbMetricas", JSON.stringify(tbMetricas));
		alert("Exercícios alterados.")
		operacaoMet = "Am";
		return true;
	}

	function ListarMet(){
		$("#tblListarMet").html("");
		$("#tblListarMet").html(
			"<thead>"+
			"	<tr>"+
			"<th></th>"+
			"	<th>Código</th>"+
			"	<th>Categoria</th>"+
			"	<th>Tempo de Movimentação</th>"+
			"	<th>Distância</th>"+
			"	<th>Calorias Gastas</th>"+
			"	</tr>"+
			"</thead>"+
			"<tbody>"+
			"</tbody>"
			);

		 for(var im in tbMetricas){
			var met = JSON.parse(tbMetricas[im]);
		  	$("#tblListarMet tbody").append("<tr>"+
									 	 "	<td><img src='edit.png' alt='"+im+
										  "' class='btnEditar'/><img src='delete.png' alt='"+im+
										  "' class='btnExcluir'/></td>" + 
										 "	<td>"+met.TpCod+"</td>" + 
										 "	<td>"+met.Categoria+"</td>" + 
										 "	<td>"+met.Tmp+"</td>" + 
										 "	<td>"+met.Distancia+"</td>" + 
										 "	<td>"+met.Calorias+"</td>" + 
		  								 "</tr>");
		 }
	}

	function ExcluirMet(){
		tbMetricas.splice(indice_selecionadoMet, 1);
		localStorage.setItem("tbMetricas", JSON.stringify(tbMetricas));
		alert("Exercício excluído.");
	}

	function GetMetricas(propriedademet, valormet){
		var met = null;
        for (var itemmet in tbMetricas) {
            var im = JSON.parse(tbMetricas[itemmet]);
            if (im[propriedademet] == valormet)
			met = im;
        }
        return met;
	}

	ListarMet();

	$("#frmMetricas").on("submit",function(){
		if(operacaoMet == "Am")
			return AdicionarMet();
		else
			return EditarMet();		
	});

	$("#tblListarMet").on("click", ".btnEditar", function(){
		operacaoMet = "Em";
		indice_selecionadoMet = parseInt($(this).attr("alt"));
		var met = JSON.parse(tbMetricas[indice_selecionadoMet]);
		$("#txtCod").val(met.TpCod);
		$("#txtCategoria").val(met.Categoria);
		$("#txtTmp").val(met.Tmp);
		$("#txtDistancia").val(met.Distancia);
		$("#txtCalorias").val(met.Calorias);
		$("#txtCod").attr("readonly","readonly");
		$("#txtCod").focus();
	});

	$("#tblListarMet").on("click", ".btnExcluir", function(){
		indice_selecionadoMet = parseInt($(this).attr("alt"));
		ExcluirMet();
		ListarMet();
	});
});

//FIM METRICAS

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      /*if (target.length) {
       $('html, body').animate({
          scrollTop: (target.offset().top - 72)
        }, 1000, "easeInOutExpo");
        return false;
      }*/
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 75
  });

  // Collapse Navbar
  var navbarCollapse = function() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-scrolled");
    } else {
      $("#mainNav").removeClass("navbar-scrolled");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

  // Magnific popup calls
  $('#portfolio').magnificPopup({
    delegate: 'a',
    type: 'image',
    tLoading: 'Loading image #%curr%...',
    mainClass: 'mfp-img-mobile',
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0, 1]
    },
    image: {
      tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
    }
  });

})(jQuery); 
