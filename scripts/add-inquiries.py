import json
paths=[r"D:\DOWNLOAD\websiteanka\data\content.json", r"D:\DOWNLOAD\websiteanka\data\content.seed.json"]
for p in paths:
    with open(p,encoding="utf-8") as f:
        data=json.load(f)
    if "inquiries" not in data:
        data["inquiries"]=[]
    # default stock status
    for prod in data.get("products",[]):
        if "stockStatus" not in prod:
            prod["stockStatus"]="available"
    with open(p,"w",encoding="utf-8") as f:
        json.dump(data,f,ensure_ascii=False,indent=2)
        f.write("\n")
print("done")