    ///////////////////////////////////////////////////////////
    // spitting out the letters
    ///////////////////////////////////////////////////////////
    var alphabet = 'abcdefghijklmnopqrstuvwxyz';
    var letters = alphabet.split('');
    // console.log(letters);


    var choices = document.getElementById('choices');
    var span = document.createElement('span');
    var misses = document.getElementById('miss-box');
    var tuba = document.getElementById('tuba')
    var fantastic = document.getElementById('fantastic')
    var ding = document.getElementById('choosing');

    tubaTime = tuba.duration;
    delay = tubaTime + 5;
    console.log(delay);
    // choices.appendChild(span);
    console.log(letters.length);
    i = 0;
    letters.forEach(function(letter) {
        var span = document.createElement('span');
        // choices.appendChild(span);
        span.innerHTML = letter;
    });
    ///////////////////////////////////////////
    function reload() {
        location.reload();
    }

    function createElement(input, output) {
        for (i = 0; i < input.length; i++) {

            var span = document.createElement('span');
            if (input[i] == " ") {
                // span.innerHTML = "--";
                span.className = "space";
            } else {
                lower = input[i].toLowerCase();
                span.innerHTML = lower;
                // console.log(span);
                span.className = lower;
                span.classList.add('letter');
            }
            output.appendChild(span);
            // console.log(lower);
        }

    }

    function unique(list) {

        var result = [];
        var listNoSpace = list.indexOf(" ");
        if (listNoSpace > -1) {
            var spaces = list.splice(listNoSpace, 1);
        }

        $.each(list, function(i, e) {
            if ($.inArray(e, result) == -1) result.push(e);
        });
        return result;
    }

    function createHangMan(containerID, numberVariable) {
        var part = document.createElement('div');
        var id = containerID.id;
        var container = document.getElementById(id);
        part.className = lower;
        part.classList.add('body-' + numberVariable);
        console.log(id);

        container.appendChild(part);
    }


    createElement(letters, choices);
    /////////////////////////////////////////////////

    var listSelect = {
        sports: {
            name: 'Sports Team',
            array: ['New York Yankees', 'New England Patriots', 'Toronto Raptors', 'Baltimore Orioles', 'Edmonton Oilers', 'Edmonton Eskimos']
        },

        music: {
            name: 'Jazz Musician',
            array: ['Miles Davis', 'John Coltrane', 'Charles Mingus', 'Art Blakey', 'Sun Ra', 'Louis Armstrong', 'Pee Wee Russell', 'Shooby Taylor']
        },

        canada: {
            name: 'Canadiana',
            array: ['Alberta', 'Vancouver', 'Saskatchewan', 'Loonie', 'Maple Syrup', 'Snowmageddon']
        },

        movies: {
            name: 'Movie',
            array: ['Star Wars', 'The Big Lebowski', 'The Meaning of Life', 'Friday', 'Tropic Thunder']
        }
    }

    // console.log(Object.keys(listSelect));
    var property = Object.keys(listSelect); // getting a random property
    var randKey = property[Math.floor(Math.random() * property.length)]; // get a random list
    var hint = document.getElementById('hint');
    console.log(hint);
    hint.innerHTML = listSelect[randKey].name;

    var words = listSelect[randKey].array;
    // console.log(words);
    var rand = words[Math.floor(Math.random() * words.length)]; // get a random word
    var output = rand.toLowerCase().split('');
    var number = rand.length; // number of characters in name
    var guessBox = document.getElementById('guess-box');
    createElement(output, guessBox);
    console.log(unique(output));


    /////////////////////////////////////////////////

    var losses = 0;
    var wins = 0;
    var winNumber = parseFloat(unique(output).length);
    console.log('WIN NUMBER: ' + winNumber);

    console.log('number of letters: ' + (number - 1));

    $('.choices span').one('click', function() {
        // console.log(counter);

        // console.log(this);
        var p = $(this).html();
        $(this).addClass('chosen');
        var showIt = $(`.guess-box .${p}`);
        // console.log(p);
        showIt.addClass('picked');

        if (output.includes(p)) {
            $(this).clone().appendTo('.hits');
            wins++;

            if (wins < winNumber) {
                if (ding.currentTime != 0) {
                    ding.currentTime = 0;
                    ding.play();
                } else {
                    ding.play();
                }
            }


            if (wins == (winNumber)) {
                $('.game-over').addClass('animated zoomIn');
                $('.game-over span').addClass('animated rubberBand infinite').text('YOU WIN!!!').delay(3000).queue(function() {
                    $(this).removeClass('rubberBand infinite').addClass('fadeOutLeftBig');
                    $('.play-again').delay(300).queue(function() {
                        $(this).addClass('animated zoomInDown');
                    });
                });
                winning.play();

            } else {
                console.log('WINS: ' + wins);
            }

        } else {
            $(this).clone().appendTo('.miss-box');
            losses++;
            if (losses < 6) {
                if (fail.currentTime != 0) {
                    fail.currentTime = 0;
                    fail.play();
                } else {
                    fail.play();
                }
            }

            // console.log(counter);
            createHangMan(gallows, losses);
            if (losses >= 6) {
                $('.game-over').addClass('animated zoomIn');
                $('.gallows-wrap').css('z-index', '10');
                $('.body-1').delay(500, function() {
                    $(this).stop().fadeOut("1000", function() {
                        $(this).css("background", "url('img/hm-head.png')").fadeIn(1000);
                    });
                }, function() {
                    $(this).stop().fadeOut("1000", function() {
                        $(this).css("background", "url('img/hm-bag.png')").fadeOut(1000);
                    });
                });
                $('.game-over span').addClass('animated rubberBand infinite').text('YOU LOSE!!!').delay(3500).queue(function() {
                    $(this).removeClass('rubberBand infinite').addClass('fadeOutLeftBig');
                    $('.play-again').delay(300).queue(function() {
                        $(this).addClass('animated zoomInDown');
                    });
                });

                tuba.play();
                setTimeout(function() {
                    fantastic.play();
                }, 5000);
            }
        }

    });