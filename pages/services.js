import DashboardLayout from "layouts/DashboardLayout";
import Services from "layouts/Services";

export default function ServicesPage() {
    return (
        <div>
            <DashboardLayout pageName="Services">
                <Services />
            </DashboardLayout>
        </div>
    );
}
