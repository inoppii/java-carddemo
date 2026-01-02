import os

def test_basic_design_existence():
    assert os.path.exists("design_docs/basic_design.md"), "Basic design doc missing"

def test_basic_design_structure():
    with open("design_docs/basic_design.md", "r", encoding="utf-8") as f:
        content = f.read()
    
    headers = [
        "## 1. システム概要",
        "## 2. アーキテクチャ設計",
        "## 3. 機能設計",
        "## 4. データ設計",
        "## 5. 外部インターフェース設計",
        "## 6. 移行方針"
    ]
    
    for h in headers:
        assert h in content, f"Header '{h}' missing"

if __name__ == "__main__":
    test_basic_design_existence()
    test_basic_design_structure()
    print("Phase 1 Tests Passed")
