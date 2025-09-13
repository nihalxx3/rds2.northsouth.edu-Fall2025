
// ==UserScript==
// @name         RDS3 NSU Course Data Extractor
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Extract course data from NSU advising page and download as CSV
// @author       nihalxx3
// @match        https://rds3.northsouth.edu/students/advising*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to extract course data from the table
    function extractCourseData() {
        console.debug('extractCourseData: called');
        const courseCells = document.querySelectorAll('td[onclick*="addNewCourses"]');
        console.debug('extractCourseData: courseCells found:', courseCells.length);
        if (!courseCells || courseCells.length === 0) {
            console.log('Course cells not found. Script will try again on next refresh.');
            return null;
        }

        const courses = [];
        const roomArr = [];
        // ...existing code for roomArr initialization...
        roomArr[0] = "TBA";
        roomArr[1] = "NAC601";
        roomArr[2] = "NAC602";
        roomArr[3] = "NAC603";
        roomArr[4] = "NAC604";
        roomArr[5] = "NAC605";
        roomArr[6] = "NAC501";
        roomArr[7] = "NAC502";
        roomArr[8] = "NAC503";
        roomArr[9] = "NAC504";
        roomArr[10] = "NAC505";
        roomArr[11] = "NAC506";
        roomArr[12] = "NAC507";
        roomArr[13] = "NAC508";
        roomArr[14] = "NAC509";
        roomArr[15] = "NAC510";
        roomArr[16] = "NAC409";
        roomArr[17] = "NAC410";
        roomArr[18] = "NAC411";
        roomArr[19] = "NAC414";
        roomArr[20] = "NAC309";
        roomArr[21] = "NAC310";
        roomArr[22] = "NAC206";
        roomArr[23] = "NAC207";
        roomArr[24] = "NAC208";
        roomArr[25] = "NAC209";
        roomArr[26] = "NAC210";
        roomArr[27] = "SAC401";
        roomArr[28] = "SAC402";
        roomArr[29] = "SAC403";
        roomArr[30] = "SAC404";
        roomArr[31] = "SAC405";
        roomArr[32] = "SAC406";
        roomArr[33] = "SAC407";
        roomArr[34] = "NAC401";
        roomArr[35] = "NAC402";
        roomArr[36] = "NAC403";
        roomArr[37] = "NAC404";
        roomArr[38] = "NAC405";
        roomArr[39] = "NAC406";
        roomArr[40] = "NAC407";
        roomArr[41] = "NAC408";
        roomArr[42] = "NAC412";
        roomArr[43] = "NAC413";
        roomArr[44] = "SAC304";
        roomArr[45] = "SAC305";
        roomArr[46] = "SAC306";
        roomArr[47] = "SAC307";
        roomArr[48] = "SAC308";
        roomArr[49] = "SAC309";
        roomArr[50] = "SAC310";
        roomArr[51] = "SAC311";
        roomArr[52] = "SAC312";
        roomArr[53] = "SAC313";
        roomArr[54] = "SAC201";
        roomArr[55] = "SAC207";
        roomArr[56] = "SAC208";
        roomArr[57] = "NAC301";
        roomArr[58] = "NAC302";
        roomArr[59] = "NAC303";
        roomArr[60] = "NAC304";
        roomArr[61] = "NAC305";
        roomArr[62] = "NAC306";
        roomArr[63] = "NAC307";
        roomArr[64] = "NAC308";
        roomArr[65] = "SAC203";
        roomArr[66] = "SAC209";
        roomArr[67] = "SAC210";
        roomArr[68] = "SAC211";
        roomArr[69] = "NAC201";
        roomArr[70] = "NAC202";
        roomArr[71] = "NAC203";
        roomArr[72] = "NAC204";
        roomArr[73] = "NAC205";
        roomArr[81] = "LAB1";
        roomArr[82] = "LAB2";
        roomArr[84] = "LAB4";
        roomArr[85] = "OAT1001";
        roomArr[86] = "OAT1002";
        roomArr[87] = "OAT1003";
        roomArr[89] = "OAT901";
        roomArr[90] = "OAT902";
        roomArr[91] = "OAT903";
        roomArr[93] = "OAT803";
        roomArr[94] = "LIB901";
        roomArr[95] = "LIB902";
        roomArr[96] = "LIB903";
        roomArr[97] = "LIB904";
        roomArr[98] = "LIB905";
        roomArr[100] = "LIB907";
        roomArr[101] = "LIB908";
        roomArr[103] = "SAC802";
        roomArr[121] = "NAC514";
        roomArr[122] = "NAC415";
        roomArr[123] = "NAC311";
        roomArr[124] = "SAC202";
        roomArr[128] = "NAC213";
        roomArr[129] = "NAC214";
        roomArr[130] = "NAC215";
        roomArr[131] = "NAC216";
        roomArr[132] = "SAC204";
        roomArr[133] = "NAC517";
        roomArr[135] = "OAT601";
        roomArr[136] = "OAT602";
        roomArr[144] = "NAC990";
        roomArr[145] = "NAC991";
        roomArr[146] = "NAC992";
        roomArr[147] = "NAC993";
        roomArr[148] = "LIB906";
        roomArr[150] = "SAC501";
        roomArr[151] = "SAC502";
        roomArr[152] = "SAC504";
        roomArr[153] = "SAC508";
        roomArr[154] = "SAC206";
        roomArr[155] = "SAC205";
        roomArr[156] = "NAC620";
        roomArr[158] = "SAC510";
        roomArr[159] = "SAC512";
        roomArr[160] = "SAC514";
        roomArr[162] = "SAC511";
        roomArr[163] = "SAC513";
        roomArr[164] = "LIB602";
        roomArr[165] = "LIB603";
        roomArr[166] = "LIB601";
        roomArr[174] = "NAC621";
        roomArr[175] = "NAC619";
        roomArr[176] = "NAC619A";
        roomArr[177] = "NAC211";
        roomArr[178] = "LIB604";
        roomArr[179] = "LIB605";
        roomArr[180] = "LIB606";
        roomArr[181] = "LIB607";
        roomArr[182] = "LIB608";
        roomArr[183] = "SAC506";
        roomArr[184] = "SAC507";
        roomArr[185] = "SAC1018";
        roomArr[186] = "NAC511";
        roomArr[187] = "LIB609";
        roomArr[188] = "LIB610";
        roomArr[189] = "LIB611";
        roomArr[190] = "SAC509";
        roomArr[192] = "SAC503";
        roomArr[193] = "NAC512";
        roomArr[194] = "NAC513";
        roomArr[195] = "NAC313";
        roomArr[196] = "NAC314";
        roomArr[197] = "NAC315";
        roomArr[198] = "SAC314";
        roomArr[199] = "SAC315";
        roomArr[200] = "SAC316";
        roomArr[203] = "B113";
        roomArr[204] = "B115";
        roomArr[205] = "B117";
        roomArr[206] = "B118";
        roomArr[207] = "B310A";
        roomArr[209] = "SAC724";
        roomArr[210] = "SAC726";
        roomArr[211] = "SAC409";
        roomArr[212] = "SAC412";
        roomArr[213] = "SAC413";
        roomArr[214] = "SAC414";
        roomArr[215] = "SAC415";
        roomArr[221] = "OAT803_V";
        roomArr[224] = "LIB903_V";
        roomArr[225] = "LIB906_V";
        roomArr[230] = "LIB901_V";
        roomArr[232] = "LIB905_V";
        roomArr[234] = "OAT902_V";
        roomArr[235] = "SAC411";
        roomArr[236] = "SAC411_V";
        roomArr[244] = "NAC617";
        roomArr[245] = "NAC618";
        roomArr[246] = "NAC1077";
        roomArr[247] = "NAC1078";
        roomArr[248] = "NAC1079";
        roomArr[249] = "NAC1080";
        roomArr[252] = "SAC726_V";
        roomArr[254] = "SAC412_V";
        roomArr[255] = "SAC414_V";
        roomArr[256] = "SAC413_V";
        roomArr[260] = "SAC409_V";
        roomArr[266] = "NAC505";
        roomArr[275] = "SAC726_V1";
        roomArr[280] = "LIB910";
        roomArr[281] = "LIB913";
        roomArr[284] = "LIB913_V";
        roomArr[286] = "LIB1002";
        roomArr[287] = "LIB1002_V";
        roomArr[288] = "SAC801A";
        roomArr[290] = "OAT1002_V";
        roomArr[292] = "LIB902_V";
        roomArr[293] = "LIB904_V";
        roomArr[294] = "";
        roomArr[295] = "SAC415_v1";
        roomArr[305] = "OAT803_V1";
        roomArr[306] = "TBA_v2";
        roomArr[307] = "SAC801";
        roomArr[308] = "OAT903_V1";
        roomArr[309] = "LIB904_V1";
        roomArr[320] = "LIB901_v1";
        roomArr[321] = "SAC415B";
        roomArr[326] = "SAC415B_V";
        roomArr[332] = "Upper Plaza";
        roomArr[341] = "NAC515";
        roomArr[343] = "OAT803_V2";
        roomArr[345] = "TV LAB";
        roomArr[351] = "NAC201-v1";
        roomArr[352] = "LIB902_V1";
        roomArr[358] = "TV STUDIO";
        roomArr[360] = "NAC512A";
        roomArr[361] = "NTR304";
        roomArr[362] = "NAC514";
        roomArr[363] = "NTR301";

        // ...existing code for extracting courses...
        const processedCourses = new Set();
        courseCells.forEach((cell, idx) => {
            console.debug('extractCourseData: processing cell', idx);
            const onclickAttr = cell.getAttribute('onclick');
            console.debug('extractCourseData: onclickAttr:', onclickAttr);
            const extractParams = new Function(`
                let params = [];
                const mockFunction = function() {
                    params = Array.from(arguments);
                };
                const addNewCourses = mockFunction;
                ${onclickAttr};
                return params;
            `);
            const params = extractParams();
            console.debug('extractCourseData: params:', params);
            if (params.length >= 10) {
                const courseCode = params[0];
                const section = params[4];
                const roomId = parseInt(params[5]);
                const timeId = parseInt(params[6]);
                const faculty = params[7];
                const totalSeat = params[8];
                const takenSeat = params[9];
                const courseIdentifier = `${courseCode}-${section}-${timeId}`;
                if (processedCourses.has(courseIdentifier)) {
                    console.debug('extractCourseData: duplicate courseIdentifier', courseIdentifier);
                    return;
                }
                processedCourses.add(courseIdentifier);
                const courseTime = typeof timeArray !== 'undefined' ? (timeArray[timeId] || "Unknown") : "Unknown";
                courses.push({
                    CourseCode: courseCode,
                    Section: section,
                    Faculty: faculty,
                    CourseTime: courseTime,
                    TotalSeat: totalSeat,
                    TakenSeat: takenSeat,
                    RoomId: roomId,
                    Room: roomArr[roomId] || "Unknown"
                });
                console.debug('extractCourseData: course added:', courses[courses.length-1]);
            }
        });
        console.debug('extractCourseData: returning courses:', courses.length);
        return courses;
    }

    function convertToCSV(courses) {
        console.debug('convertToCSV: called with courses:', courses.length);
        const timestamp = new Date().toISOString();
        let csvContent = `# lastUpdated: ${timestamp}\n`;
        const headers = ['CourseCode', 'Section', 'Faculty', 'CourseTime', 'TotalSeat', 'TakenSeat', 'RoomId', 'Room'];
        csvContent += headers.join(',') + '\n';
        courses.forEach((course, idx) => {
            const row = [
                course.CourseCode,
                course.Section,
                course.Faculty,
                course.CourseTime,
                course.TotalSeat,
                course.TakenSeat,
                course.RoomId,
                course.Room
            ];
            csvContent += row.join(',') + '\n';
            console.debug('convertToCSV: row', idx, row);
        });
        console.debug('convertToCSV: returning csvContent length:', csvContent.length);
        return csvContent;
    }


    // Function to push CSV to local server as updated.csv
    function pushCSVToServer(csvContent) {
        console.debug('pushCSVToServer: called');
        if (!window.fetch) {
            console.error('Fetch API not supported in this browser.');
            return;
        }
        console.debug('pushCSVToServer: sending fetch request');
        fetch('http://localhost:20005/source/updated.csv', {
            method: 'POST',
            headers: {
                'Content-Type': 'text/csv'
            },
            body: csvContent
        })
        .then(response => {
            console.debug('pushCSVToServer: fetch response status:', response.status);
            if (!response.ok) {
                console.error('Server responded with status:', response.status, response.statusText);
                return response.text().then(text => { console.error('Response body:', text); });
            }
            return response.text();
        })
        .then(data => {
            if (data) {
                console.log('CSV pushed to server:', data);
            }
        })
        .catch(error => {
            console.error('Error uploading CSV:', error);
        });
    }

    function downloadJSON(courses) {
        const jsonData = {
            lastUpdated: new Date().toISOString(),
            courses: courses
        };
        const jsonString = JSON.stringify(jsonData, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', 'course_data.json');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    // Main execution on page load
    window.addEventListener('load', function() {
        console.debug('window load event: script started');
        const courses = extractCourseData();
        console.debug('window load event: courses:', courses);
        if (courses && courses.length > 0) {
            const csvContent = convertToCSV(courses);
            console.debug('window load event: csvContent:', csvContent);
            pushCSVToServer(csvContent);
            // Uncomment below to also download JSON
            // downloadJSON(courses);
            console.log(`Successfully extracted ${courses.length} courses and pushed as updated.csv to server`);
        } else {
            console.debug('window load event: no courses extracted');
        }
    });

})();