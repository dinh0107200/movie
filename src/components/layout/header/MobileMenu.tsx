"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import { fetchCategory, fetchCountries, Prop } from "@/services/hederService";

const types = [
  { title: "Phim bộ", slug: "phim-bo" },
  { title: "Phim lẻ", slug: "phim-le" },
  { title: "Hoạt hình", slug: "hoat-hinh" },
];

export default function MobileMenu() {
  const [categories, setCategories] = useState<Prop[]>([]);
    const [countries, setCountries] = useState<Prop[]>([]);
    
    useEffect(() => {
      fetchCategory()
        .then((data) => setCategories(data))
        .catch((err) => console.error("Lỗi load thể loại:", err));
  
      fetchCountries().then((data) => setCountries(data))
      .catch((err) => console.error("Lỗi load quốc gia:", err))
    }, []);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:text-red-400"
        >
          <Menu className="w-6 h-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="bg-gray-900 text-white p-6">
        <SheetHeader className="hidden">
          <SheetTitle></SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col space-y-4">
          <Link href="/" className="hover:text-red-400">
            Trang chủ
          </Link>
          <div>
            <p className="text-red-400 font-semibold">Thể loại</p>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/categories/${cat.slug}`}
                  className="text-sm hover:text-red-400"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-red-400 font-semibold">Quốc gia</p>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {countries.map((c) => (
                <Link
                  key={c.id}
                  href={`/countries/${c.slug}`}
                  className="text-sm hover:text-red-400"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-red-400 font-semibold">Phim</p>
            <div className="flex flex-col gap-2 mt-2">
              {types.map((t, idx) => (
                <Link
                  key={idx}
                  href={`/types/${t.slug}`}
                  className="text-sm hover:text-red-400"
                >
                  {t.title}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
