# homework-8-take-3

LIRI is a text-based program for requesting information on movies, songs, and musicians. LIRI accepts two arguments: 1) a command and 2) an argument to use for that command.

List of commands that LIRI accepts:

1. concert-this - Used to find information on the next concert that a given band or musician is going to be performing. Provides the venue name, location of the venue, and date of the next concert. If no information is given, it will default to Streetlight Manifesto, because I will continue to keep ska alive, no matter how dead it has been since 2008.

2. spotify-this-song - Used to find information on a given song. Returns the original artist, cover artists, Spotify preview link, and album for a given song. If no information is given, it will default to "This Sign" by Ace of Base.

3. movie-this - Used to look up information on a given movie title. Returns the title, year of release, IMDB and Rotten Tomatoes ratings, country of production, languages, plot summary, and cast. If no argument is given, it will give information on the 2009 film "Mr. Nobody"

4. do-what-it-says - This command will review the "random.txt" file. The file's text should be formatted as acceptable-command,"argument" such that "acceptable command" is one of three arguments listed above, and "argument" is a valid argument (IE if we are calling the movie function, we have given it a movie title.) If the command in random.txt is "do-what-it-says," the program will chastise the user for trying to cause a recursion error and exit without causing a recursion error.

[Video demonstration of all of these commands](https://youtu.be/enlwBsTfMEQ)
