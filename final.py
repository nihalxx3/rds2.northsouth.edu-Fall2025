import csv
from pathlib import Path

INPUT_CSV = "updated.csv"
SAMPLE_HTML = "sample.html"
OUTPUT_HTML = "index.html"

def read_header(sample_path: str, header_lines: int = 100) -> str:
    p = Path(sample_path)
    if not p.exists():
        print(f"Warning: {sample_path} not found, using basic HTML structure")
        return """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Course List - Fall 2025</title>
    <style>
        .full { background-color: #ff0000; color: white; }
        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: center; }
        th { background-color: #f2f2f2; }
    </style>
</head>
<body>
    <h1>Offered Course List (Fall 2025)</h1>
    <table>
        <thead>
            <tr>
                <th>Serial</th>
                <th>Course</th>
                <th>Section</th>
                <th>Faculty</th>
                <th>Time</th>
                <th>Room</th>
                <th>Seats Available</th>
            </tr>
        </thead>
        <tbody>
"""
    with p.open("r", encoding="utf-8") as f:
        lines = f.readlines()
    return "".join(lines[:header_lines])

def build_row_html(serial: int, course: str, section: str, faculty: str, time_str: str, room: str, seats_available: int) -> str:
    seat_class = "full" if str(seats_available).strip() == "0" else ""
    course = (course or "").upper()
    faculty = (faculty or "").upper()
    return (
        "                <tr>\n"
        "                    <td>\n"
        f"                        {serial}.\n"
        "                    </td>\n"
        "                    <td>\n"
        f"                        {course}\n"
        "                    </td>\n"
        "                    <td>\n"
        f"                        {section}\n"
        "                    </td>\n"
        "                    <td>\n"
        f"                        {faculty}\n"
        "                    </td>\n"
        "                    <td>\n"
        f"                        {time_str}\n"
        "                    </td>\n"
        f"                    <td>{room}</td>\n"
        f"                    <td class=\"{seat_class}\">\n"
        f"                        {seats_available}\n"
        "                    </td>\n"
        "                </tr>\n"
    )

def main():
    header_html = read_header(SAMPLE_HTML, 101)
    rows_html_parts = []
    
    # Read CSV and filter out comment lines
    with open(INPUT_CSV, "r", encoding="utf-8-sig", newline="") as f:
        # Filter out lines starting with #
        filtered_lines = [line for line in f if not line.strip().startswith('#')]
    
    # Create CSV reader from filtered lines
    reader = csv.DictReader(filtered_lines)
    serial = 1
    
    for row in reader:
        course = row.get('CourseCode', '')
        section = row.get('Section', '')
        faculty = row.get('Faculty', '')
        time_str = row.get('CourseTime', '')
        room = row.get('Room', '')
        try:
            total_seat = int(row.get('TotalSeat', '0'))
            taken_seat = int(row.get('TakenSeat', '0'))
            seats_available = total_seat - taken_seat
        except (ValueError, TypeError):
            seats_available = 0
        
        rows_html_parts.append(
            build_row_html(serial, course, section, faculty, time_str, room, seats_available)
        )
        serial += 1
    
    closing_fragment = (
        "        </tbody>\n"
        "    </table>\n"
        "</body>\n"
        "</html>\n"
    )
    
    out_html = header_html + "".join(rows_html_parts) + closing_fragment
    
    with open(OUTPUT_HTML, "w", encoding="utf-8") as out:
        out.write(out_html)
    
    print(f"Successfully wrote {OUTPUT_HTML} with {len(rows_html_parts)} rows.")

if __name__ == "__main__":
    main()
