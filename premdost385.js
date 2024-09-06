(function () {



    //  #############################  Functions To be Injected  ############################# //





    // Function to get AngularJS scope by element class or ID

    function getScope(elementClass) {

        var el = document.querySelector(elementClass);

        if (el) {

            var scope = angular.element(el).scope();

            return scope;

        }

        return null;

    }



    let showAlert = false;

    var scope = getScope('.ng-scope');



    if (scope) {



        scope.AttemptExam = function (x) {

            if (x.Status == 'Attempt' && x.CanAttempt) {



                if (showAlert) {

                    alert("Please Install GLA Safe Exam Browser to Attempt this Exam.");

                    return false;

                }



                if (x.AttemptPopUp) {



                    openPopUp(x.AttemptLink, 0, 0, 2);



                }

                else {

                    window.location = x.AttemptLink;

                }

            }

            if (x.Status == 'Finished' && x.FeedbackLink != '') {

                openPopUp(x.FeedbackLink, 0, 0, 2);

            }

        }



        scope.OpenExam = function (x) {



            if (x.StatusText == "Attempt") {

                if (showAlert) {

                    alert("Please Install GLA Safe Exam Browser to Attempt this Exam.");

                    return false;

                }



                var httpreq = {

                    method: 'POST',

                    url: 'DashboardMain.aspx/SetTimeOnLogin',

                    headers: {

                        'Content-Type': 'application/json; charset=utf-8',

                        'dataType': 'json'

                    },

                    data: { 'quizNo': x.QuizNo }

                }

                $http(httpreq).then(function (response) {

                    if (response.data.d.Status == "Success") {



                    }

                    else {

                        alert(response.data.d.Message);

                        return false;

                    }

                }).catch(function (error) {

                    console.log(error);

                    console.log("Error");

                });

                openPopUp(x.EncId, 0, 0, 2);

            }

        }



    }



    // Function to set Top Bar

    function setupTopBar() {

        const headerContainer = document.getElementById('header-container');



        const header = document.createElement('div');

        header.className = 'header';



        const logo = document.createElement('img');

        logo.src = 'https://i.postimg.cc/Cx9Rrz3z/GLA-Icon.png';

        logo.alt = 'GLA University Logo';

        header.appendChild(logo);



        const headerTitle = document.createElement('div');

        headerTitle.className = 'header-title';

        headerTitle.innerText = 'GLA University - Online Examination System';

        header.appendChild(headerTitle);



        const headerIcons = document.createElement('div');

        headerIcons.className = 'header-icons';



        const minimizeIcon = document.createElement('img');

        minimizeIcon.src = 'https://i.postimg.cc/Wb4zJvZ4/Navigation.png';

        minimizeIcon.alt = 'Minimize';

        headerIcons.appendChild(minimizeIcon);



        header.appendChild(headerIcons);



        document.body.appendChild(header);



        document.body.style.paddingTop = 30 + 'px';

    }



    // Function to set Bottom Bar

    function setupBottomBar() {



        var bottomDiv = document.createElement('div');

        bottomDiv.className = 'bottom-div';



        var imgGLAIcon = document.createElement('img');

        imgGLAIcon.src = 'https://i.postimg.cc/Cx9Rrz3z/GLA-Icon.png';

        imgGLAIcon.alt = 'GLA Icon';



        var rightDiv = document.createElement('div');

        rightDiv.className = 'right-div';



        var imgBatteryIcon = document.createElement('img');

        imgBatteryIcon.src = 'https://i.postimg.cc/PfKkr0r4/battery-icon.png';

        imgBatteryIcon.alt = 'Battery Icon';



        var imgWifiIcon = document.createElement('img');

        imgWifiIcon.src = 'https://i.postimg.cc/K8BLtPW0/wifi-icon.png';

        imgWifiIcon.alt = 'Wifi Icon';



        var imgEngIcon = document.createElement('img');

        imgEngIcon.src = 'https://i.postimg.cc/9fcpMgfd/eng-icon.png';

        imgEngIcon.alt = 'ENG Icon';



        var pDateTime = document.createElement('p');

        pDateTime.id = 'datetime';



        var imgPowerIcon = document.createElement('img');

        imgPowerIcon.src = 'https://i.postimg.cc/50YfF370/power-icon.png';

        imgPowerIcon.alt = 'Power Icon';

        imgPowerIcon.style.paddingRight = '10px';



        rightDiv.appendChild(imgBatteryIcon);

        rightDiv.appendChild(imgWifiIcon);

        rightDiv.appendChild(imgEngIcon);

        rightDiv.appendChild(pDateTime);

        rightDiv.appendChild(imgPowerIcon);



        bottomDiv.appendChild(imgGLAIcon);

        bottomDiv.appendChild(rightDiv);



        document.body.appendChild(bottomDiv);



        document.body.style.paddingBottom = 40 + 'px';



        function updateDateTime() {

            var dt = new Date();

            var hours = dt.getHours().toString().padStart(2, '0');

            var minutes = dt.getMinutes().toString().padStart(2, '0');

            var timeFormat = hours >= 12 ? 'PM' : 'AM';

            var formattedTime = (hours % 12 || 12) + ':' + minutes + ' ' + timeFormat;

            var formattedDate = (dt.getMonth() + 1).toString().padStart(2, '0') + '/' + dt.getDate().toString().padStart(2, '0') + '/' + dt.getFullYear();



            pDateTime.innerHTML = '<span style="font-weight: 600;">' + formattedTime + '</span><br>' + formattedDate;

        }



        updateDateTime();



        setInterval(updateDateTime, 60000);

    }



    // Function to enable Change Questions and Previous button

    function enableChangeQues() {

        if (document.getElementById("MaxQues")) {



            let MaxQues = document.getElementById("MaxQues").value



            for (let i = 1; i <= MaxQues; i++) {

                let questionId = "Q_" + i;

                let divElement = document.getElementById(questionId);

                if (divElement) {

                    divElement.setAttribute("onclick", "return ChangeQues('" + i + "');");

                }

            }



            for (let i = 1; i <= MaxQues; i++) {

                if (i != 1) {

                    let prevLink = document.getElementById(`prev_${i}`);

                    if (prevLink) {

                        prevLink.removeAttribute('style');

                        prevLink.setAttribute("onclick", "return ChangeQues('" + (i - 1) + "');");

                    }

                }

                if (i != MaxQues) {

                    let nextLink = document.getElementById(`next_${i}`);

                    if (nextLink) {

                        nextLink.removeAttribute('onclick');

                        nextLink.setAttribute("onclick", "return ChangeQues('" + (i + 1) + "');");

                    }

                }

            }



        }

    }



    // Function to copy Text by single text click

    function smartAutoCopy() {



        var mainButtons = document.querySelectorAll('.mainbuttons');



        mainButtons.forEach(function (mainButton) {



            var boldElements = mainButton.querySelectorAll('div b');



            boldElements.forEach(function (boldElement) {



                boldElement.addEventListener('click', function () {



                    var parentDiv = this.closest('div[id^="quespanel_"]');



                    if (!parentDiv) {

                        console.error('Parent div with id starting with "quespanel_" not found.');

                        return;

                    }



                    var mainQuestionDiv = parentDiv.querySelector('.mainquestion');



                    if (!mainQuestionDiv) {

                        console.error('Sub div with class "mainquestion" not found inside the parent div.');

                        return;

                    }



                    var questionText = mainQuestionDiv.innerText.trim();





                    if (navigator.clipboard && navigator.clipboard.writeText) {



                        // Copy text to clipboard using Clipboard API

                        navigator.clipboard.writeText(questionText)

                            .then(function () {

                                console.log(questionText);



                                boldElement.style.color = 'red';

                                setTimeout(function () {

                                    boldElement.style.color = 'black';

                                }, 1000);

                            })

                            .catch(function (err) {

                                console.error('Failed to copy text to clipboard:', err);

                            });

                    } else {



                        // Copy text to clipboard using Copy Command

                        var tempTextArea = document.createElement('textarea');

                        tempTextArea.value = questionText;

                        document.body.appendChild(tempTextArea);



                        tempTextArea.select();

                        tempTextArea.setSelectionRange(0, 99999);



                        try {

                            document.execCommand('copy');

                            console.log(questionText);



                            boldElement.style.color = 'red';

                            setTimeout(function () {

                                boldElement.style.color = 'black';

                            }, 1000);

                        }

                        catch (err) {

                            console.error('Failed to copy text to clipboard:', err);

                        }



                        document.body.removeChild(tempTextArea);



                    }

                });

            });

        });



    }



    // Function to enable selection and clicks

    function allowRightClick() {

        document.addEventListener('contextmenu', function (event) {

            event.stopPropagation();

        }, true);

        document.onselectstart = null;

        document.oncopy = null;

        document.onkeypress = document.onkeydown = document.onkeyup = null;

    }



    // Function to enable clipboard copy

    function allowClipboardCopy() {

        $('body').unbind('cut copy paste drop drag');

    }



    // Add Custom CSS - Function

    const Add_Custom_Style = css => document.head.appendChild(document.createElement("style")).innerHTML = css

    const script = document.createElement('script');



    Add_Custom_Style(`



        body {

            overflow: hidden !important;

        }



        .header {

            color: #707070 !important;

            display: flex;

            position: fixed;

            z-index: 9999;

            left: 0;

            top: 0;

            width: 100%;

            align-items: center;

            justify-content: space-between;

            padding-left:6px;

            background-color: #DADADA;

            border-bottom: 1px solid #ccc;

        }



        .header img {

            height: 20px;

        }



        .header-title {

            flex-grow: 1;

            margin-left: 10px;

            font-size: 12px;

        }



        .header-icons {

            display: flex;

            align-items: center;

        }



        .header-icons img {

            height: 30px;

            margin-left: 10px;

            cursor: pointer;

        }





        .bottom-div {

            font-family: arial, sans-serif;

            color: #707070 !important;

            background-color: #00b7ff;

            padding: 0;

            position: fixed;

            z-index: 9999;

            left: 0;

            bottom: 0;

            height: 40px;

            width: 100%;

            display: flex;

            justify-content: space-between;

            align-items: center; /* Center items vertically */

        }



        .bottom-div img {

            height: 35px;

            padding-left: 16px;

            padding-top: 2px;

        }



        .right-div {

            padding: 0px;

            border-radius: 0px;

            margin-left: auto; /* Pushes .right-div to the right */

        }



        .right-div img {

            height: 30px; /* Example height for the image inside right-div */

            width: auto; /* Adjust width as needed */

            padding-top: 5px;

            position: relative;

            top: -6px;

        }



        .right-div p {

            font-size: 15px;

            display: inline-block;

            padding-left: 10px;

            padding-right: 10px;

            text-align: center;

            position: relative;

            top: 8px;

            line-height: 18px;

        }

    `);





    //  #############################  Functions Called  ############################# //



    setupTopBar();

    setupBottomBar();

    enableChangeQues();

    smartAutoCopy();

    // allowRightClick();

    allowClipboardCopy();



})();
