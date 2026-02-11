from app import gatekeeper

app = gatekeeper()

if __name__ == '__main__':
    app.run(debug=True)