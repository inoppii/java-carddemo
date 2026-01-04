package com.carddemo.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private boolean maintenanceMode = false;

    @GetMapping("/system-info")
    public ResponseEntity<Map<String, Object>> getSystemInfo() {
        Map<String, Object> info = new HashMap<>();
        info.put("status", "UP");
        info.put("version", "0.0.1-SNAPSHOT");
        info.put("currentTime", LocalDateTime.now());
        info.put("maintenanceMode", maintenanceMode);
        info.put("javaVersion", System.getProperty("java.version"));
        return ResponseEntity.ok(info);
    }

    @PostMapping("/maintenance-mode")
    public ResponseEntity<Map<String, Boolean>> toggleMaintenanceMode(@RequestBody Map<String, Boolean> request) {
        maintenanceMode = request.getOrDefault("enabled", false);
        Map<String, Boolean> response = new HashMap<>();
        response.put("maintenanceMode", maintenanceMode);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/jobs/interest-calculation")
    public ResponseEntity<Map<String, String>> runInterestCalculation() {
        // シミュレーション: 実際には Spring Batch 等を呼び出す
        Map<String, String> response = new HashMap<>();
        response.put("jobName", "InterestCalculationJob");
        response.put("status", "COMPLETED");
        response.put("message", "利息計算バッチ処理が正常に終了しました。");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/jobs/daily-posting")
    public ResponseEntity<Map<String, String>> runDailyPosting() {
        Map<String, String> response = new HashMap<>();
        response.put("jobName", "DailyPostingJob");
        response.put("status", "COMPLETED");
        response.put("message", "日次ポスティング処理が正常に終了しました。");
        return ResponseEntity.ok(response);
    }
}
