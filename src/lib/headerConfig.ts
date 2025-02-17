import { getAkiradocsConfig } from "./getAkiradocsConfig";
import { HeaderConfig } from "../types/config";
export function getHeaderConfig(): HeaderConfig {
  const config = getAkiradocsConfig();

  // Check if API spec exists
  // if (folderExists('en/api')) {
  //   navItems.push({
  //     label: "API Reference",
  //     href: "/apiReference",
  //     icon: "/api.svg",
  //     show: true
  //   });
  // }

  return {
    logo: config.branding.logo,
    title: config.site.title,
    showSearch: true,
    searchPlaceholder: config.navigation.header.searchPlaceholder,
    navItems: config.navigation.header.items,
    socialLinks: config.footer?.socialLinks,
    languages: config.localization,
    currentLocale: config.localization.defaultLocale,
  };
}
