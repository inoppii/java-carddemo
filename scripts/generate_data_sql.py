import os

# Define file paths
DATA_DIR = 'app/data/ASCII'
OUTPUT_FILE = 'app/ddl/data.sql'

# Define input files
CUST_FILE = os.path.join(DATA_DIR, 'custdata.txt')
ACCT_FILE = os.path.join(DATA_DIR, 'acctdata.txt')
CARD_FILE = os.path.join(DATA_DIR, 'carddata.txt')
TRAN_FILE = os.path.join(DATA_DIR, 'dailytran.txt')

def parse_zoned_decimal(value_str):
    """Parses a zoned decimal string into a float."""
    if not value_str:
        return 0.0
    
    last_char = value_str[-1]
    prefix = value_str[:-1]
    
    sign = 1
    last_digit = 0
    
    # Standard EBCDIC-to-ASCII zoned decimal mapping
    if last_char == '{': last_digit = 0; sign = 1
    elif 'A' <= last_char <= 'I': last_digit = ord(last_char) - ord('A') + 1; sign = 1
    elif last_char == '}': last_digit = 0; sign = -1
    elif 'J' <= last_char <= 'R': last_digit = ord(last_char) - ord('J') + 1; sign = -1
    elif '0' <= last_char <= '9': last_digit = int(last_char); sign = 1 # Plain digit
    else:
        # Fallback or error, treat as 0 for safety in this demo
        last_digit = 0
        
    try:
        number_str = prefix + str(last_digit)
        # Assuming implied 2 decimal places for currency fields based on COBOL V99
        value = float(number_str) / 100.0 * sign
        return value
    except ValueError:
        return 0.0

def escape_sql(text):
    if text:
        return text.replace("'", "''").strip()
    return ""

def generate_customer_inserts(f_in, f_out):
    print("Generating Customer INSERTS...")
    for line in f_in:
        if len(line) < 100: continue # Skip empty or short lines
        
        # Mapping based on CUSTREC.cpy
        cust_id = line[0:9].strip()
        fname = escape_sql(line[9:34])
        mname = escape_sql(line[34:59]) # Not used in simple schema
        lname = escape_sql(line[59:84])
        addr1 = escape_sql(line[84:134])
        addr2 = escape_sql(line[134:184])
        state = escape_sql(line[234:236]) # CUST-ADDR-STATE-CD
        # Country skipped
        zip_code = escape_sql(line[239:249]) # CUST-ADDR-ZIP
        phone1 = escape_sql(line[249:264])
        email = f"user{cust_id}@example.com" # Placeholder email
        dob = line[308:318] # CUST-DOB-YYYYMMDD
        
        # Adjust DOB format if necessary (YYYY-MM-DD is standard SQL)
        if len(dob) == 10 and dob[4] == '-' and dob[7] == '-':
            pass # Already YYYY-MM-DD
        elif len(dob) == 8:
            dob = f"{dob[0:4]}-{dob[4:6]}-{dob[6:8]}"
        
        sql = f"INSERT INTO customer (customer_id, first_name, last_name, date_of_birth, address, city, state, zip_code, phone_number, email) VALUES ({cust_id}, '{fname}', '{lname}', '{dob}', '{addr1}', '', '{state}', '{zip_code}', '{phone1}', '{email}');\n"
        f_out.write(sql)

def generate_account_inserts(f_in, f_out):
    print("Generating Account INSERTS...")
    for line in f_in:
        if len(line) < 50: continue
        
        # Mapping based on CVACT01Y.cpy
        acct_id = line[0:11].strip()
        status = line[11:12] # ACCT-ACTIVE-STATUS
        balance = parse_zoned_decimal(line[12:24]) # ACCT-CURR-BAL S9(10)V99
        limit = parse_zoned_decimal(line[24:36])   # ACCT-CREDIT-LIMIT S9(10)V99
        # Skip cash limit
        open_date = line[48:58] # ACCT-OPEN-DATE
        
        # Need customer_id. For now, assuming 1:1 or mapping derived from acct_id?
        # The sample data has 11-digit acct ID and 9-digit cust ID.
        # Often in these demos, Acct ID might be related to Cust ID, or we need a lookup.
        # Looking at cardxref.txt might help, but for simplicity, let's assume 
        # customer_id = acct_id (truncated) or just link sequentially if IDs match.
        # Actually custdata has IDs 1, 2, 3...
        # Acct data has IDs 00000000001, 00000000002...
        # So we can link acct_id 1 to cust_id 1.
        
        cust_id = int(acct_id) 
        
        status_str = 'ACTIVE' if status == 'Y' else 'CLOSED'
        
        sql = f"INSERT INTO account (account_id, customer_id, account_number, account_status, balance, credit_limit, open_date) VALUES ({int(acct_id)}, {cust_id}, '{acct_id}', '{status_str}', {balance}, {limit}, '{open_date}');\n"
        f_out.write(sql)

def generate_card_inserts(f_in, f_out):
    print("Generating Card INSERTS...")
    for line in f_in:
        if len(line) < 50: continue
        
        # Mapping based on CVACT02Y.cpy
        card_num = line[0:16]
        acct_id = line[16:27]
        cvv = line[27:30]
        exp_date = line[80:90]
        status = line[90:91]
        
        status_str = 'ACTIVE' if status == 'Y' else 'EXPIRED'
        
        sql = f"INSERT INTO card (account_id, card_number, card_type, expiration_date, cvv, card_status) VALUES ({int(acct_id)}, '{card_num}', 'VISA', '{exp_date}', '{cvv}', '{status_str}');\n"
        f_out.write(sql)

def main():
    with open(OUTPUT_FILE, 'w') as f_out:
        f_out.write("-- Initial Data Load Script\n")
        f_out.write("BEGIN;\n\n")
        
        # Customer
        if os.path.exists(CUST_FILE):
            with open(CUST_FILE, 'r') as f_in:
                generate_customer_inserts(f_in, f_out)
        
        # Account
        if os.path.exists(ACCT_FILE):
            with open(ACCT_FILE, 'r') as f_in:
                generate_account_inserts(f_in, f_out)
                
        # Card
        if os.path.exists(CARD_FILE):
            with open(CARD_FILE, 'r') as f_in:
                generate_card_inserts(f_in, f_out)

        # Users (Static)
        f_out.write("\n-- System Users\n")
        f_out.write("INSERT INTO app_user (user_id, password_hash, role) VALUES ('USER001', 'password', 'USER');\n")
        f_out.write("INSERT INTO app_user (user_id, password_hash, role) VALUES ('ADMIN001', 'admin', 'ADMIN');\n")

        f_out.write("\nCOMMIT;\n")
        print(f"Data script generated at {OUTPUT_FILE}")

if __name__ == "__main__":
    main()
