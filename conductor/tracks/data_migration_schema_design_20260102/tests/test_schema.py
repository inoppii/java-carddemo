import os

def test_schema_file_existence():
    schema_path = "conductor/tracks/data_migration_schema_design_20260102/schema.sql"
    assert os.path.exists(schema_path), f"Schema file not found at {schema_path}"

def test_schema_content():
    schema_path = "conductor/tracks/data_migration_schema_design_20260102/schema.sql"
    with open(schema_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    expected_strings = [
        "CREATE TABLE customer",
        "CREATE TABLE account",
        "CREATE TABLE card",
        "CREATE TABLE transaction_history",
        "CREATE TABLE auth_fraud",
        "CREATE TABLE transaction_type",
        "CREATE TABLE transaction_category",
        "ALTER TABLE card ADD CONSTRAINT fk_card_account",
        "ALTER TABLE transaction_history ADD CONSTRAINT fk_tran_card",
        "CREATE INDEX idx_cust_name",
        "CREATE INDEX idx_tran_card_ts"
    ]
    
    for s in expected_strings:
        assert s in content, f"Expected '{s}' not found in schema.sql"

if __name__ == "__main__":
    try:
        test_schema_file_existence()
        test_schema_content()
        print("All tests passed!")
    except AssertionError as e:
        print(f"Test failed: {e}")
        exit(1)