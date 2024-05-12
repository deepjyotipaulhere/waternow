from flask import Flask, jsonify, make_response, request
from flask_cors import CORS
import psycopg2

app = Flask(__name__)
CORS(app)

def connect():
    return psycopg2.connect(
        host="localhost",
        database="waternow",
        user='postgres',
        password='1234')


@app.route("/")
def hi():
    return "hello"


@app.route("/signin", methods=['POST'])
def signin():
    data = request.get_json()
    with connect(as_dict=True) as conn:
        with conn.cursor() as cur:
            cur.execute("SELECT id,email,name FROM users WHERE email=%s AND password=%s",(data['username'], data['password']))
            res=cur.fetchall()
            print(res)
            if len(cur)<0:
                return make_response(500, "Invalid credentials")
            else:
                return jsonify(res[0])


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
