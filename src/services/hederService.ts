import { li } from "framer-motion/client";
import { apiGet } from "./axiosClient";



export interface Prop {
  id: string;
  name: string;
  slug?: string;
}

export async function fetchCategory(): Promise<Prop[]> {
  try {
    const data = await apiGet<any>("/the-loai");
    const items = data?.data?.items ?? data?.data ?? data ?? [];
    return items.map((x: any) => ({
      id: x._id ?? x.id ?? x.slug,
      name: x.name,
      slug: x.slug,
    }));
  } catch (err) {
    console.error("fetchCategory error:", err);
    return [];
  }
}

export async function fetchCountries(): Promise<Prop[]> {
  try {
    const res = await apiGet<any>("/quoc-gia", {
      baseKey: "phim_root",
    });

    const root = res ?? {};
    const list =
      root?.data?.items ??
      root?.data?.data ??
      root?.items ??
      root?.data ??
      root ?? [];
    if (!Array.isArray(list)) return [];

    return list.map((x: any) => ({
      id: x._id ?? x.id ?? x.slug ?? "",
      name: x.name ?? "",
      slug: x.slug ?? "",
    }));
  } catch (error) {
    console.error("fetchCountries error:", error);
    return [];
  }
}