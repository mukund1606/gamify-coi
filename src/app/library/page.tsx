import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

import data from "@/data/articlesData.json";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";

export default function LibraryPage({
  searchParams,
}: {
  searchParams: {
    page?: string;
  };
}) {
  const pageNumber = parseInt(searchParams.page!) || 1;
  return (
    <div>
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center">
        Indian Constitution Articles Library
      </h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
        {data.slice((pageNumber - 1) * 9, pageNumber * 9)?.map((article) => (
          <Card key={article.article}>
            <CardHeader>
              <CardTitle>{article.title}</CardTitle>
              <CardDescription>Article No:{article.article}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{article.description}</p>
            </CardContent>
          </Card>
        ))}
        <div className="col-span-full flex gap-2 justify-center items-center">
          <Button
            className="text-md font-bold text-center"
            disabled={pageNumber <= 1}
          >
            <a href="/library?page=1">First</a>
          </Button>
          <Button
            className="text-md font-bold text-center"
            disabled={pageNumber <= 1}
          >
            <a href={`/library?page=${pageNumber - 1}`}>
              <ArrowBigLeft />
            </a>
          </Button>
          <Button
            className="text-md font-bold text-center"
            disabled={pageNumber >= Math.ceil(data.length / 9)}
          >
            <a href={`/library?page=${pageNumber + 1}`}>
              <ArrowBigRight />
            </a>
          </Button>
          <Button
            className="text-md font-bold text-center"
            disabled={pageNumber >= Math.ceil(data.length / 9)}
          >
            <a href={`/library?page=${Math.ceil(data.length / 9)}`}>Last</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
