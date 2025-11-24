import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { siteSchema, SiteFormInputs } from "@/lib/validation";
import { siteServices } from "@/services/setupService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import {
  regionService,
  countryServices,
  cityServices,
} from "@/services/setupService";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CustomSelect from "@/components/CustomSelect";

const AddSite = () => {
  // const location = useLocation();
  // const id = location.state?.id;
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  // console.log(id, "siteDatasiteData");
  const navigate = useNavigate();
  const [actionLoading, setActionLoading] = useState(false);
  const [regions, setRegions] = useState<any[]>([]);
  const [loadingRegions, setLoadingRegions] = useState(false);
  const [countriesDropDownData, setCountriesDropDownData] = useState<any[]>([]);
  const [loadingcountries, setLoadingCountries] = useState(false);
  const [citiesDropDownData, setCitiesDropDownData] = useState<any[]>([]);
  const [loadingCities, setLoadingCities] = useState(false);

  console.log(
    countriesDropDownData,
    "countriesDropDownDatacountriesDropDownData"
  );
  console.log(citiesDropDownData, "citiesDropDownDatacitiesDropDownData");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    watch,
    control,
    formState: { errors },
  } = useForm<SiteFormInputs>({
    resolver: zodResolver(siteSchema),
    defaultValues: {
      country_id: "",
      city_id: "",
      // attachment_filenames:ticket?.attachments || []
    },
  });

  // Fake data for dropdowns (can be fetched from API later)

  const [timezones] = useState([
    { id: "UTC-5", name: "Eastern Time (UTC-5)" },
    { id: "UTC+0", name: "Greenwich Mean Time (UTC+0)" },
    { id: "UTC+5", name: "Pakistan Standard Time (UTC+5)" },
  ]);

  const [languages] = useState([
    { id: "en", name: "English" },
    { id: "fr", name: "French" },
    { id: "es", name: "Spanish" },
  ]);

  console.log(getValues(), "getValuesgetValuesgetValues");
  console.log(errors, "errorserrorserrorserrors");

  useEffect(() => {
    const loadRegions = async () => {
      setLoadingRegions(true);
      try {
        const regions = await regionService.getRegionDropdown();
        setRegions(regions);
        console.log(regions);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingRegions(false);
      }
    };
    loadRegions();
  }, []);

  useEffect(() => {
    const loadCountries = async () => {
      setLoadingCountries(true);
      try {
        const countries = await countryServices.getCountryDropdown();
        setCountriesDropDownData(countries);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingCountries(false);
      }
    };
    loadCountries();
  }, []);

  const countryId = watch("country_id");

  useEffect(() => {
    if (countryId) {
      loadCities(countryId);
    } else {
      setCitiesDropDownData([]); // reset if no category selected
    }
  }, [countryId]);

  const loadCities = async (counId) => {
    setLoadingCities(true);
    try {
      const cities = await cityServices.getCityDropdown(counId);
      setCitiesDropDownData(cities);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingCities(false);
    }
  };

  useEffect(() => {
    if (id) {
      loadSiteData(id);
    }
  }, [id]);

  const loadSiteData = async (siteId) => {
    try {
      // const [reqData, techData, groupData] = await Promise.all([
      const res = await siteServices.getById(siteId);
      if (res?.success) {
        const sites = res.data;
        reset({
          name: sites.name || "",
          description: sites.description || "",
          country_id: sites.country_id ? String(sites.country_id) : "",
          city_id: sites.city_id ? String(sites.city_id) : "",
          province: sites.province || "",
          email: sites.email || "",
          phone: sites.phone || "",
          fax: sites.fax || "",
          website: sites.website || "",
          region_id: sites.region_id ? sites.region_id : null,
          language: sites.language ? String(sites.language) : "",
          timezone: sites.timezone ? String(sites.timezone) : "",
        });
      }
      // setDropDown(dropDownData?.data);
    } catch (error) {
      console.log(error, "errorerrorerror");
    }
  };

  const onSubmit = async (data: SiteFormInputs) => {
    setActionLoading(true);
    try {
      //   const payload = {
      //     ...data,
      //   };

      if (id) {
        const res = await siteServices.update(id, data);
        if (res?.success) {
          toast({
            title: "Success",
            description: res?.message || "Site updated successfully.",
          });
          reset();
          navigate("/setup/site");
        }
      } else {
        const res = await siteServices.create(data);
        if (res?.success) {
          toast({
            title: "Success",
            description: res?.message || "Site created successfully.",
          });
          reset();
          navigate("/setup/site");
        }
      }
    } catch (error: any) {
      console.log(error, "errorerror");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="flex items-center justify-between border-b pt-2 bg-white border-[#e6e6e6] border-dotted">
        <h2 className="text-xl font-semibold text-foreground leading-[40px]">
          {id ? "Edit Site" : "Add New Site"}
        </h2>
        <button>
          <span className="bg-blue-600 w-7 h-7 flex items-center justify-center rounded-full text-white text-sm">
            ?
          </span>
        </button>
      </div>

      <form className="space-y-10 pt-6" onSubmit={handleSubmit(onSubmit)}>
        {/* ===== SITE DETAILS ===== */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 border-b border-dotted">
            Site Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-1 gap-2 mt-2 ml-3">
            {/* Name */}
            <div className="flex items-center">
              <Label
                htmlFor="name"
                className="min-w-[150px] text-sm font-normal"
              >
                Name <span className="text-red-500">*</span>
              </Label>
              <div className="flex flex-col min-w-[250px]">
                <Input id="name" {...register("name")} className="mt-2" />
                {errors.name && (
                  <p className="text-red-500 text-sm ml-3">
                    {errors.name.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center">
              <Label
                htmlFor="description"
                className="min-w-[150px] text-sm font-normal"
              >
                Description
              </Label>
              <div className="flex flex-col min-w-[250px]">
                <Textarea
                  id="description"
                  className="mt-2 resize-none min-h-[100px]"
                  {...register("description")}
                />
              </div>
            </div>

            {/* Region Dropdown */}
            <div className="flex items-center">
              <Label className="min-w-[150px] text-sm font-normal">
                Region
              </Label>
              <Select
                onValueChange={(value) => setValue("region_id", Number(value))}
                disabled={loadingRegions}
              >
                <SelectTrigger className="max-w-[250px] mt-2">
                  <SelectValue
                    placeholder={
                      loadingRegions ? "Loading..." : "Select Region"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {regions.map((region: any) => (
                    <SelectItem key={region.id} value={String(region.id)}>
                      {region.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Timezone Dropdown */}
            <div className="flex items-center">
              <Label className="min-w-[150px] text-sm font-normal">
                Time Zone
              </Label>
              <Select
                onValueChange={(value: string) => setValue("timezone", value)}
              >
                <SelectTrigger className="max-w-[250px] mt-2">
                  <SelectValue placeholder="Select Time Zone" />
                </SelectTrigger>
                <SelectContent>
                  {timezones.map((tz) => (
                    <SelectItem key={tz.id} value={tz.id}>
                      {tz.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Language Dropdown */}
            <div className="flex items-center">
              <Label className="min-w-[150px] text-sm font-normal">
                Language
              </Label>
              <Select onValueChange={(value) => setValue("language", value)}>
                <SelectTrigger className="max-w-[250px] mt-2">
                  <SelectValue placeholder="Select Language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.id} value={lang.id}>
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* ===== ADDRESS ===== */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 border-b border-dotted">
            Address
          </h3>

          <div className="grid grid-cols-1 gap-2 mt-2 ml-3">
            {/* Country Dropdown */}
            <div className="flex items-center">
              <Label className="min-w-[150px] text-sm font-normal">
                Country
              </Label>
              {/* <Select
                onValueChange={(value) => handleCountryChange(value)}
                disabled={loadingcountries}
              >
                <SelectTrigger className="max-w-[250px] mt-2 text-gray-900 ">
                  <SelectValue
                    placeholder={
                      loadingcountries ? "Loading..." : "Select Country"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {countries?.map((ct: any) => (
                    <SelectItem key={ct.id} value={ct.id}>
                      {ct.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select> */}
              <Controller
                name="country_id"
                control={control}
                render={({ field }) => (
                  <div>
                    <CustomSelect
                      {...field}
                      className="min-w-[250px] mt-2 text-gray-900 "
                      options={countriesDropDownData || []}
                      placeholder="-- Select Country --"
                      showNoneOption
                      defaultValue={
                        countriesDropDownData?.find(
                          (r) => r.id == field.value
                        ) || null
                      }
                      onChange={(option) => {
                        field.onChange(option?.id.toString() || "");
                        setValue("city_id", "");
                      }}
                    />
                  </div>
                )}
              />
            </div>

            <div className="flex items-center">
              <Label
                htmlFor="doorNumber"
                className="min-w-[150px] text-sm font-normal"
              >
                Door Number
              </Label>
              <Input id="doorNumber" className="mt-2 max-w-[250px]" />
            </div>

            <div className="flex items-center">
              <Label
                htmlFor="street"
                className="min-w-[150px] text-sm font-normal"
              >
                Street
              </Label>
              <Input id="street" className="mt-2 max-w-[250px]" />
            </div>

            <div className="flex items-center">
              <Label
                htmlFor="landmark"
                className="min-w-[150px] text-sm font-normal"
              >
                Landmark
              </Label>
              <Input id="landmark" className="mt-2 max-w-[250px]" />
            </div>
            <div className="flex items-center">
              <Label className="min-w-[150px] text-sm font-normal">City</Label>
              {/* <Select
                onValueChange={(value) => {
                  setValue("city", value);
                }}
                disabled={loadingCities || cities.length === 0}
              >
                <SelectTrigger className="max-w-[250px] mt-2">
                  <SelectValue
                    placeholder={loadingCities ? "loading.." : "Select Cities"}
                  />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((city) => (
                    <SelectItem key={city.id} value={city.id}>
                      {city.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select> */}

              <Controller
                name="city_id"
                control={control}
                render={({ field }) => (
                  <CustomSelect
                    {...field}
                    className="min-w-[250px] mt-2 text-gray-900 "
                    options={(countryId && citiesDropDownData) || []}
                    placeholder="-- Select City --"
                    defaultValue={
                      citiesDropDownData?.find((r) => r.id == field.value) ||
                      null
                    }
                    onChange={(option) =>
                      field.onChange(option?.id?.toString())
                    }
                    showNoneOption
                  />
                )}
              />

              {/* <Select onValueChange={(value) => setValue("language", value)}>
                                <SelectTrigger className="max-w-[250px] mt-2">
                                    <SelectValue placeholder="Select Language" />
                                </SelectTrigger>
                                <SelectContent>
                                    {languages.map((lang) => (
                                        <SelectItem key={lang.id} value={lang.id}>
                                            {lang.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select> */}
            </div>

            <div className="flex items-center">
              <Label
                htmlFor="province"
                className="min-w-[150px] text-sm font-normal"
              >
                State/Province
              </Label>
              <Input id="province" 
              {...register("province")}
              className="mt-2 max-w-[250px]" />
            </div>
          </div>
        </div>

        {/* ===== CONTACT INFORMATION ===== */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 border-b border-dotted">
            Contact Information
          </h3>
          <div className="grid grid-cols-1 gap-2 mt-4 ml-3">
            <div className="flex items-center">
              <Label
                htmlFor="email"
                className="min-w-[150px] text-sm font-normal"
              >
                Email
              </Label>
              <Input
                type="email"
                {...register("email")}
                id="email"
                className="mt-2 max-w-[250px]"
              />
            </div>

            <div className="flex items-center">
              <Label
                htmlFor="phone"
                className="min-w-[150px] text-sm font-normal"
              >
                Phone No.
              </Label>
              <Input
                type="tel"
                {...register("phone")}
                id="phone"
                className="mt-2 max-w-[250px]"
              />
            </div>

            <div className="flex items-center">
              <Label
                htmlFor="fax"
                className="min-w-[150px] text-sm font-normal"
              >
                Fax No.
              </Label>
              <Input
                type="tel"
                {...register("fax")}
                id="fax"
                className="mt-2 max-w-[250px]"
              />
            </div>

            <div className="flex items-center">
              <Label
                htmlFor="website"
                className="min-w-[150px] text-sm font-normal"
              >
                Web URL
              </Label>
              <Input
                type="url"
                {...register("website")}
                id="website"
                className="mt-2 max-w-[250px]"
              />
            </div>
          </div>
        </div>

        {/* ===== BUTTONS ===== */}
        <div className="flex justify-center gap-4 mt-6">
          <Button
            type="submit"
            className="w-[140px] h-[44px]"
            disabled={actionLoading}
          >
            {actionLoading ? "Saving..." : id ? "Update Site" : "Save"}
          </Button>

          <Button
            type="button"
            variant="outline"
            className="w-[140px] h-[44px]"
            onClick={() => navigate("/setup/site")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddSite;
