from flask import Flask, request
import json

app = Flask(__name__)

with open('../client/data.json') as f:
    data = json.load(f)

@app.route("/jobs")
def get_jobs():
    return data

@app.route("/jobs/<id>")
def get_job_by_id(id):
    index = request.view_args["id"]
    [final_data] = [i for i in data if i["id"] == int(index)]
    return final_data


@app.route("/jobs", methods=['POST'])
def add_job():
    prev_id = data[-1]["id"]
    next_id = int(prev_id) + 1
    json_data = request.get_json()
    new_data = {
        "id": next_id,
        "company": json_data["company"],
        "logo": json_data["logo"],
        "new": json_data["new"],
        "featured": json_data["featured"],
        "position": json_data["position"],
        "role": json_data["role"],
        "level": json_data["level"],
        "postedAt": json_data["postedAt"],
        "contract": json_data["contract"],
        "location": json_data["location"],
        "languages": json_data["languages"],
        "tools":json_data["tools"]
    }

    data.append(new_data)
    with open('../client/data.json', "w") as f:
        json.dump(data, f, indent=4)

    return new_data, 201

@app.route("/jobs/<id>", methods=["PATCH"])
def update_job(id):
    index = request.view_args["id"]
    json_data = request.get_json()
    
    [final_data] = [i for i in data if i["id"] == int(index)]
    new_index = data.index(final_data)
    for a in list(json_data.keys()):
        final_data[a] = json_data[a]

    new_data = data[:new_index]+[final_data]+data[new_index+1:]
    with open('../client/data.json', "w") as f:
        json.dump(new_data, f, indent=4)

    return final_data

@app.route("/jobs/<id>", methods=["DELETE"])
def delete_job(id):
    index = request.view_args["id"]
    [final_data] = [i for i in data if i["id"] == int(index)]
    data.remove(final_data)

    with open('../client/data.json', "w") as f:
        json.dump(data, f, indent=4)

    return f"Data with id {index} was sucessfully deleted", 204