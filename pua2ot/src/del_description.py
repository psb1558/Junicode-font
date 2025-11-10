import yaml
from yaml import dump

yfile = open("PUA2OT.yaml")
data = yaml.safe_load(yfile)
yfile.close()

kk = data.keys()
for k in kk:
    if "desc" in data[k]:
        del data[k]["desc"]
    if "note" in data[k]:
        del data[k]["note"]

with open("newdata.yaml", "w") as newfile:
    yaml.dump(data, newfile, default_flow_style=False)

