@Data
public class DashboardResponse {
    private BigDecimal totalRevenue;
    private long totalBookings;
    private long activeTours;
    private long totalUsers;
    private List<MonthlyRevenueDTO> revenueChart; 
}