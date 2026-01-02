import os

def test_analysis_report_existence():
    report_path = "conductor/tracks/data_migration_schema_design_20260102/analysis_report.md"
    assert os.path.exists(report_path), f"Analysis report not found at {report_path}"

def test_analysis_report_content():
    report_path = "conductor/tracks/data_migration_schema_design_20260102/analysis_report.md"
    with open(report_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Check for major sections
    assert "VSAM ファイル分析" in content
    assert "DB2 & IMS 定義分析" in content
    
    # Check for key entities
    assert "CUSTOMER-RECORD" in content
    assert "ACCOUNT-RECORD" in content
    assert "AUTHFRDS" in content
    assert "DBPAUTP0" in content

if __name__ == "__main__":
    try:
        test_analysis_report_existence()
        test_analysis_report_content()
        print("All tests passed!")
    except AssertionError as e:
        print(f"Test failed: {e}")
        exit(1)
