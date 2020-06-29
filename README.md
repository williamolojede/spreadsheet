# Building an Interactive Spreadsheet

Today, the vast majority of businesses implement their commission plan models
in Microsoft Excel, Google Sheets, or some other spreadsheet software. In this
problem, you will implement a simplified browser-based spreadsheet that can be
used to implement an extremely simple financial model.

# Requirements

* For simplicity, the size of the spreadsheet is fixed to 10 rows and 10
  columns.
  	- Columns are named after capital letters, starting with "A".
	- Rows are numbered and increasing, starting from "1".
* The state of the spreadsheet should be maintained in a backend service that
  is mutatable via API calls.
* The frontend should be interactive: saving data after a cell in the
  spreadsheet changes, and updating any affected cells with their newly
  computed values.
* The state of the spreadsheet should be persisted across server restarts.
* Cell values should support either an integer or a simple formula that
  references other cells and only needs to support addition.
    - For example, `-1` and `123` should be able to be stored in a cell.
    - `=A1+B1` should be able to be stored in a cell, and the display value
      should be the result of evaluating the sum of the value in `A1` and
      the value in `B1`.

# Out-of-scope

* Don't worry about handling multiple concurrent users viewing and editing the
  spreadsheet at the same time.

# Background

The sample code distributed with this package is provided to you as a starting
point if you'd like to use it.

## Setup

1. Set up your virtualenv: `virtualenv -p python3 interview_venv`
2. Source the `activate` script: `source interview_venv/bin/activate`
3. Install the dependencies in your virtualenv:
   `pip install -r requirements.txt`
4. Run the server `FLASK_DEBUG=1 FLASK_APP=server.py flask run`
