
from rapidfuzz import fuzz

KNOWN_EMPLOYERS = {
    "TCS": "Tata Consultancy Services",
    "CTS": "Cognizant Technology Solutions",
    "INFY": "Infosys",
    "WIPRO": "Wipro"
}

def normalize_employer(name):
    name = name.lower().strip().replace("ltd", "").replace("pvt", "").replace(".", "")
    if name.upper() in KNOWN_EMPLOYERS:
        return KNOWN_EMPLOYERS[name.upper()].lower()
    return name

def match_employer(resume_list, epfo_list, itr_list):
    results = []

    for resume_emp in resume_list:
        res_clean = normalize_employer(resume_emp)
        match_found = {"resume": resume_emp, "epfo_match": "Red", "itr_match": "Red"}

        for epfo_emp in epfo_list:
            epfo_clean = normalize_employer(epfo_emp)
            score = fuzz.partial_ratio(res_clean, epfo_clean)
            if score >= 85:
                match_found["epfo_match"] = "Green"
                break
            elif score >= 60 and match_found["epfo_match"] != "Green":
                match_found["epfo_match"] = "Amber"

        for itr_emp in itr_list:
            itr_clean = normalize_employer(itr_emp)
            score = fuzz.partial_ratio(res_clean, itr_clean)
            if score >= 85:
                match_found["itr_match"] = "Green"
                break
            elif score >= 60 and match_found["itr_match"] != "Green":
                match_found["itr_match"] = "Amber"

        results.append(match_found)

    return results
