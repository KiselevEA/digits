jQuery(document).ready(function($){

	var firstDigit = 0;
	var secondDigit = 0;

	var firstElement = null;
	var secondElement = null;

	var rowFirstDigit = -1;
	var posFirstDigit = -1;

	var rowSecondDigit = -1;
	var posSecondDigit = -1;

	function resetDigits() {
		rowFirstDigit = -1;
		posFirstDigit = -1;

		rowSecondDigit = -1;
		posSecondDigit = -1;

		firstElement.removeClass('first');
		secondElement.removeClass('second');
		firstElement = null;
		secondElement = null;	
	}

	function comparsionAndSum(digitOne, digitTwo) {
		if ( ( digitOne == digitTwo ) || ( (digitOne + digitTwo) == 10 ) ) {
			return true;
		} else {
			return false;
		}

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
	

	function verPosition(posFirstDigit, posSecondDigit) {
		if ( posFirstDigit != posSecondDigit ) return false;
		$('.digit-field .full-cell').index(posFirstDigit).each(function() {
			$(this).clone().appendTo('.calculator');
		});

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
		$('.calculator').empty();
		
	}


	$(".digit-field").on('click', '.full-cell', function() {
		if ( ( $('.digit-field .full-cell').hasClass('active') == true) && ($(this).hasClass('active') == false ) ) {
			secondElement = $(this);
			secondElement.addClass('second');
			secondDigit = parseInt($(this).text());
			rowSecondDigit = $(this).parent('tr').index();
			posSecondDigit = $(this).index();

			if ( comparsionAndSum(firstDigit, secondDigit) && positionElements() ) {
				firstElement.removeClass('full-cell').addClass('obliterated');
				secondElement.removeClass('full-cell').addClass('obliterated');
				$('.digit-field td.active').removeClass('active');
				resetDigits();
			} else {
				$('.digit-field td.active').removeClass('active');
				resetDigits();
				firstElement = $(this);
				firstDigit = parseInt($(this).text());
				$(this).addClass('active');
				$('.current-digit').text($(this).text());
				rowFirstDigit = $(this).parent('tr').index();
				posFirstDigit = $(this).index();	
			}

		} else {
			firstElement = $(this);
			firstElement.addClass('first');
			firstDigit = parseInt($(this).text());
			$(this).addClass('active');
			$('.current-digit').text($(this).text());
			rowFirstDigit = $(this).parent('tr').index();
			posFirstDigit = $(this).index();			
		}

	});

	$(".digit-field").on("click", ".active", function() {
		$(this).removeClass('active');
		resetDigits;
		return false;
	});

	$(".obliterated").click(function() {
		alert('you');
		return false; 
	});
	
	$(".rewriteBtn").click(function() {	
		rewriteTable();
	});

});