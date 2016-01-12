jQuery(document).ready(function($){
	var moves = 0;
	var rewrites = 0;
	var removeEmptyRows = false;

	var firstDigit = 0;
	var secondDigit = 0;

	var firstElement = null;
	var secondElement = null;

	var rowFirstDigit = -1;
	var posFirstDigit = -1;

	var rowSecondDigit = -1;
	var posSecondDigit = -1;

	function resetDigits() {

		firstDigit = 0;
		secondDigit = 0;

		rowFirstDigit = -1;
		posFirstDigit = -1;

		rowSecondDigit = -1;
		posSecondDigit = -1;
		$('.full-cell').removeClass('active');
		$('.digit-field td').removeClass('first');
		$('.digit-field td').removeClass('second');
		firstElement = null;
		secondElement = null;
	}

	function horPosition() {
		$('.full-cell').each(function() {
			$(this).clone().appendTo('.calculator');
		});

		var firstIndex = $('.calculator .first').index();
		var secondIndex = $('.calculator .second').index();

		$('.calculator').empty();
			
		if ( ( (firstIndex - secondIndex) == 1) || ( (secondIndex - firstIndex) == 1 ) )  {
			return true;
		} else {
			return false;
		}

	}
	
	function verPosition(pos1, pos2) {
		if ( posFirstDigit != posSecondDigit ) return false;
		$('.digit-field tr').each(function() {
		 	$(this).children('td').eq(posFirstDigit).clone().appendTo('.calculator');
		});
		$('.calculator .obliterated').remove();
		var firstIndex = $('.calculator .first').index();
		var secondIndex = $('.calculator .second').index();

		$('.calculator').empty();

		if ( ( (firstIndex - secondIndex) == 1) || ( (secondIndex - firstIndex) == 1 ) ) {
			return true;
		} else {
			return false;
		}
	}


	function positionElements() {
		if ( horPosition() || verPosition(posFirstDigit, posSecondDigit) ) {
			return true;
		} else {
			return false;
		}
	}

	function rewriteTable() {
		$('.active').removeClass('active');
		$('.full-cell').each(function() {
			$(this).clone().appendTo('.calculator');
		});

		
		$('.calculator .full-cell').each( function() {
			if ( $('.digit-field tr:last td:last').index() < 8) {
				$(this).appendTo($('.digit-field tr:last'));
			} else {
				$('<tr></tr>').appendTo('.digit-field');
				$(this).appendTo($('.digit-field tr:last'));
			}
		});
		rewrites++;
		$('.calculator').empty();
		
	}

	function getFirstElement(element) {
		element.addClass('active');
		firstElement = element;
		element.addClass('first');
		firstDigit = parseInt(element.text());
		rowFirstDigit = element.parent('tr').index();
		posFirstDigit = $(".digit-field td.first").index();
	}

	function getSecondElement(element) {
		secondElement = element;
		element.addClass('second');
		secondDigit = parseInt(element.text());
		if ( ( firstDigit == secondDigit ) || ( (firstDigit + secondDigit) == 10 ) ) {
			rowSecondDigit = element.parent('tr').index();
			posSecondDigit = $(".digit-field td.second").index();
		} else {
			resetDigits();
			getFirstElement(element);
			return;
		}
	}
	
	function hideEmptyRow(rowDigit) {
		var row = $(".digit-field tr").eq(rowDigit);
		var hasDigit = false;
		row.children(".full-cell").each(function() {
			hasDigit = true;
			return;
		});
		if ( hasDigit == false ) row.slideUp(0);
	}

	function endGame() {
		var gameOver = true;
		$(".digit-field tr").each(function() {
			$(this).children(".full-cell").each(function() {
				gameOver = false;
				return;
			});
		});
		if ( gameOver == true ) {
			var score = 0;
			var lines = $('.digit-field tr:last').index() + 1;
			var cells = 0;

			$(".digit-field td").each(function() {
				score = score + parseInt($(this).text());
				cells++;
			});
			score = score * cells;
			$(".rewrites").text(rewrites);
			$(".cells").text(cells);
			$(".lines").text(lines);
			$('.score').text(score);
			$(".results").show();
		}

	}

	$(".digit-field").on('click', '.full-cell', function() {
		if ( firstDigit == 0 ) { 
			getFirstElement($(this));
			return;
		} else {
			getSecondElement($(this));
		}

		if ( positionElements() ) {
			firstElement.removeClass('full-cell').addClass('obliterated');
			secondElement.removeClass('full-cell').addClass('obliterated');
			$('.digit-field td.active').removeClass('active');
			if ( removeEmptyRows == true ) {
				hideEmptyRow(rowFirstDigit);
				hideEmptyRow(rowSecondDigit);
			}
			moves++;
			$(".moves").text(moves);
			endGame();

			resetDigits();
		} else {
			resetDigits();
			getFirstElement($(this));
		}



	});

	$(".digit-field").on("click", ".active", function() {
		$(this).removeClass('active');
		resetDigits();
		return false;
	});

	$(".obliterated").click(function() {
		resetDigits();		
		return false; 
	});
	
	$(".rewrite-btn").click(function() {	
		rewriteTable();
	});


	$(".remove-empty-rows").change(function() {
		if ( removeEmptyRows == false ) {
			removeEmptyRows = true;
		} else {
			removeEmptyRows = false;
		}

		if ( removeEmptyRows == true ) {
			$(".digit-field tr").each(function() {
				var hasDigit = false;
				$(this).children(".full-cell").each(function() {
					hasDigit = true;
					return;
				});
				if ( hasDigit == false ) $(this).slideUp(0);
			});
		} else {
			$(".digit-field tr").show(0);
		}
	});

	$(".rules-headline").click(function() {
		$('.rules').toggle();
	});


// end
});