    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var mazedata = new MazeData(21, 21);
    var startx = Math.floor((Math.random() * Math.floor(mazedata.width / 2) + 1)) * 2 - 1;
    var starty = Math.floor((Math.random() * Math.floor(mazedata.height / 2) + 1)) * 2 - 1;
    var endx;
    var endy;
    var endx;
    var endy;

    var bsize = 34;
    var drawinterval;
    var solveinterval;
    var drawloc = 0;

    var sec = 0;
    var min = 0;
    var hour = 0;
    var milli = 0;
    var mstring = "";
    var sstring = "";
    var minstring = "";
    var hstring = "";

    function Vector(x, y) {
        this.x = x;
        this.y = y;
    }

    function randomniRange(min, max) {
        r = Math.random();
        result = Math.round((max - min) * r) + min;
        return result;
    }

    function createstartandend() {
        startx = Math.floor((Math.random() * Math.floor(mazedata.width / 2) + 1)) * 2 - 1;
        starty = Math.floor((Math.random() * Math.floor(mazedata.height / 2) + 1)) * 2 - 1;
        endx = Math.floor((Math.random() * Math.floor(mazedata.width / 2) + 1)) * 2 - 1;
        endy = Math.floor((Math.random() * Math.floor(mazedata.height / 2) + 1)) * 2 - 1;
        while (endx == startx && endy == starty) {
            endx = Math.floor((Math.random() * Math.floor(mazedata.width / 2) + 1)) * 2 - 1;
            endy = Math.floor((Math.random() * Math.floor(mazedata.height / 2) + 1)) * 2 - 1;
        }
    }

    function drawShape(shapex, shapey) {
        ctx.fillRect((bsize * shapex), (bsize * shapey), bsize, bsize);
    }


    function MazeData(width, height) {
        this.width = width;
        this.height = height
        this.mazepoints = [];

        for (i = 0; i < width; i++) {
            this.mazepoints[i] = [];
            for (j = 0; j < height; j++) {
                if (i != 0 && j != 0 && j != width && i != height && (i % 2 == 1) &&
                    (j % 2 == 1)) {
                    this.mazepoints[i][j] = 0
                } else {
                    this.mazepoints[i][j] = 1;
                }
            }
        }
    }

    function printmaze(mazedata) {
        for (i = 0; i < mazedata.width; i++) {
            var s = "";
            for (j = 0; j < mazedata.height; j++) {
                s += mazedata.mazepoints[i][j] + " ";
                if (i == startx && j == starty) {
                    ctx.fillStyle = "rgb(0,255,0)"
                } else if (i == endx && j == endy) {
                    ctx.fillStyle = "rgb(255,0,0)"
                } else {
                    if (mazedata.mazepoints[i][j] == 1) {
                        ctx.fillStyle = "rgb(255,255,255)";
                    } else if (mazedata.mazepoints[i][j] == 2) {
                        ctx.fillStyle = "rgb(100,100,100)";
                    } else if (mazedata.mazepoints[i][j] == 4) {
                        ctx.fillStyle = "rgb(0,0,255)";
                    } else {
                        ctx.fillStyle = "rgb(0,0,0)"
                    }
                }
                drawShape(i, j);
            }
        }
    }


    var dir1unchecked = true;
    var dir2unchecked = true;
    var dir3unchecked = true;
    var dir4unchecked = true;
    // Depth First Algorithm

    function createMaze() {
        // set the current node in the array to visited
        if (mazedata.mazepoints[nextx][nexty] != 4) {
            mazedata.mazepoints[nextx][nexty] = 2;
        }

        // add the current node into your history and backstep
        //     history.push(new Vector(x, y));
        //     backstep.push(new Vector(x, y));



        // check if next node is outside the maze

        // check to see if the node has been visited before

        // if both pass the node is valid so move to it

        // When you reach an end go back a step in your history until you find a node that         has an open direction

        // repeat this until all nodes have no valid direction to move into



        //        while (dir1unchecked || dir2unchecked || dir3unchecked || dir4unchecked) {


        // pick a random direction
        var direction = randomniRange(1, 4);
        if (direction == 1) {
            nextx += 2;
            if (nextx > 0 && nextx < mazedata.width) {
                if (mazedata.mazepoints[nextx][nexty] != 2 && mazedata.mazepoints[nextx][nexty] != 4) {
                    mazedata.mazepoints[nextx - 1][nexty] = 2;
                    hist.push([nextx - 1, nexty]);
                    hist.push([nextx, nexty]);
                    backstep.push([nextx - 1, nexty]);
                    backstep.push([nextx, nexty]);
                    printmaze(mazedata);
                    dir1unchecked = true;
                    dir2unchecked = true;
                    dir3unchecked = true;
                    dir4unchecked = true;
                    //createMaze(nextx, nexty); 
                } else {
                    nextx -= 2;
                    dir1unchecked = false;

                }
            } else {
                nextx -= 2;
                dir1unchecked = false;

            }
        }
        if (direction == 2) {
            nextx -= 2;
            if (nextx > 0 && nextx < mazedata.width) {
                if (mazedata.mazepoints[nextx][nexty] != 2 && mazedata.mazepoints[nextx][nexty] != 4) {
                    mazedata.mazepoints[nextx + 1][nexty] = 2;
                    hist.push([nextx + 1, nexty]);
                    hist.push([nextx, nexty]);
                    backstep.push([nextx + 1, nexty]);
                    backstep.push([nextx, nexty]);
                    printmaze(mazedata);
                    dir1unchecked = true;
                    dir2unchecked = true;
                    dir3unchecked = true;
                    dir4unchecked = true;
                    // createMaze(nextx, nexty);                        
                } else {
                    nextx += 2;
                    dir2unchecked = false;

                }
            } else {
                nextx += 2;
                dir2unchecked = false;

            }
        }
        if (direction == 3) {
            nexty += 2;
            if (nexty > 0 && nexty < mazedata.width) {
                if (mazedata.mazepoints[nextx][nexty] != 2 && mazedata.mazepoints[nextx][nexty] != 4) {
                    mazedata.mazepoints[nextx][nexty - 1] = 2;
                    hist.push([nextx, nexty - 1]);
                    hist.push([nextx, nexty]);
                    backstep.push([nextx, nexty - 1]);
                    backstep.push([nextx, nexty]);
                    printmaze(mazedata);
                    dir1unchecked = true;
                    dir2unchecked = true;
                    dir3unchecked = true;
                    dir4unchecked = true;
                    // createMaze(nextx, nexty);                   
                } else {
                    nexty -= 2;
                    dir3unchecked = false;

                }
            } else {
                nexty -= 2;
                dir3unchecked = false;

            }

        }
        if (direction == 4) {
            nexty -= 2;
            if (nexty > 0 && nexty < mazedata.width) {
                if (mazedata.mazepoints[nextx][nexty] != 2 && mazedata.mazepoints[nextx][nexty] != 4) {
                    mazedata.mazepoints[nextx][nexty + 1] = 2;
                    hist.push([nextx, nexty + 1]);
                    hist.push([nextx, nexty]);
                    backstep.push([nextx, nexty + 1]);
                    backstep.push([nextx, nexty]);
                    printmaze(mazedata);
                    //createMaze(nextx, nexty); 
                    dir1unchecked = true;
                    dir2unchecked = true;
                    dir3unchecked = true;
                    dir4unchecked = true;

                } else {
                    nexty += 2;
                    dir4unchecked = false;

                }
            } else {
                nexty += 2;
                dir4unchecked = false;
            }

        }

        if (!dir1unchecked && !dir2unchecked && !dir3unchecked && !dir4unchecked) {


            var previouspoint = backstep.pop();
            var previouspointmid;
            if (previouspoint[0] == startx && previouspoint[1] == starty) {
                window.clearInterval(createinterval);
                timer = setInterval(starttimer, 10);
                solveinterval = setInterval(solvemaze, 100);
            } else {
                previouspointmid = backstep.pop();
                ctx.fillStyle = "rgb(0,0,255)";
                mazedata.mazepoints[previouspointmid[0]][previouspointmid[1]] = 4;
                mazedata.mazepoints[previouspoint[0]][previouspoint[1]] = 4;
                nextx = previouspoint[0];
                nexty = previouspoint[1];
                dir1unchecked = true;
                dir2unchecked = true;
                dir3unchecked = true;
                dir4unchecked = true;
            }

        }

        if (endx == nextx && endy == nexty && solutionnotset) {
            console.log("checking");
            for (i = 0; i < backstep.length; i++) {
                solve[i] = backstep[i];
                solutionnotset = false;
            }
            solve.push([nextx, nexty]);
        }

        printmaze(mazedata);

    }



    function solvemaze() {

        if (solvestep > 0) {
            ctx.fillStyle = "rgb(0,0,255)";
            drawShape(solve[solvestep - 1][0], solve[solvestep - 1][1]);
        }
        var steploc = solve[solvestep];
        ctx.fillStyle = "rgb(0,255,0)";
        drawShape(steploc[0], steploc[1]);

        if (steploc[0] == endx && steploc[1] == endy) {
            window.clearInterval(timer);
            window.clearInterval(solveinterval);
            console.log("maze was solved");
        }
        solvestep++;

    }


    function starttimer() {
        milli += 1;
        if (milli === 100) {
            sec += 1;
            milli = 0;
        }
        if (sec === 60) {
            sec = 0;
            min += 1;
        }
        if (min === 60) {
            min = 0;
            hour += 1;
        }
        mstring = "" + milli;
        sstring = "" + sec;
        minstring = "" + min;
        hstring = "" + hour;

        if (mstring.length === 1) {
            mstring = "000" + mstring;
        }
        if (sstring.length === 1) {
            sstring = "0" + sstring;
        }
        if (minstring.length === 1) {
            minstring = "0" + minstring;
        }
        if (hstring.length === 1) {
            hstring = "0" + hstring;
        }

        document.getElementById("timelabel").innerHTML = hstring + ":" + minstring + ":" + sstring + "." + mstring;
    }

    function stoptimer() {
        clearInterval(timer);
        timer = null;
        document.getElementById("start").disabled = false;
    }



    function setup() {
        canvas.style.backgroundColor = "rgb(0,0,0)";
        createstartandend();
        nextx = startx;
        nexty = starty;
        hist.push([nextx, nexty]);
        backstep.push([nextx, nexty]);
        createinterval = setInterval(createMaze, 10);
        printmaze(mazedata);

        var timerlabel = document.getElementById("timelabel");
        timerlabel.style.color = "red";

    }
    var hist = [];
    var backstep = [];
    var solve = [];
    var nextx;
    var nexty;
    var createinterval;
    var solveinterval;
    var solvestep = 0;
    var timer;
    var solutionnotset = true;
    setup();