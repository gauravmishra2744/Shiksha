import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Plus, Search, FileText, Video, Link, Image, Download, Eye, Share } from 'lucide-react'

export default function ResourcesPage() {
  const resources = [
    {
      id: '1',
      title: 'Quadratic Equations - Complete Guide',
      description: 'Comprehensive guide covering all aspects of quadratic equations with examples',
      type: 'PDF',
      size: '2.5 MB',
      class: 'Grade 10 - Mathematics',
      downloads: 45,
      isPublic: true,
      uploadDate: '2024-01-10'
    },
    {
      id: '2',
      title: 'Physics Lab Demonstration Video',
      description: 'Step-by-step demonstration of pendulum experiment',
      type: 'VIDEO',
      size: '125 MB',
      class: 'Grade 11 - Physics',
      downloads: 32,
      isPublic: false,
      uploadDate: '2024-01-08'
    },
    {
      id: '3',
      title: 'Interactive Chemistry Simulator',
      description: 'Online tool for chemical reaction simulations',
      type: 'LINK',
      size: null,
      class: 'Grade 12 - Chemistry',
      downloads: 78,
      isPublic: true,
      uploadDate: '2024-01-05'
    },
    {
      id: '4',
      title: 'Periodic Table Infographic',
      description: 'Visual representation of periodic table with element details',
      type: 'IMAGE',
      size: '1.8 MB',
      class: 'Grade 11 - Chemistry',
      downloads: 56,
      isPublic: true,
      uploadDate: '2024-01-03'
    }
  ]

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'PDF':
        return <FileText className="h-5 w-5 text-red-500" />
      case 'VIDEO':
        return <Video className="h-5 w-5 text-blue-500" />
      case 'LINK':
        return <Link className="h-5 w-5 text-green-500" />
      case 'IMAGE':
        return <Image className="h-5 w-5 text-purple-500" />
      default:
        return <FileText className="h-5 w-5 text-gray-500" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'PDF': return 'bg-red-100 text-red-800'
      case 'VIDEO': return 'bg-blue-100 text-blue-800'
      case 'LINK': return 'bg-green-100 text-green-800'
      case 'IMAGE': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Resources</h1>
          <p className="text-muted-foreground">Manage and share learning materials with your students</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Upload Resource
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search resources..." className="pl-10" />
        </div>
        <Button variant="outline">Filter by Type</Button>
        <Button variant="outline">Filter by Class</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource) => (
          <Card key={resource.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  {getTypeIcon(resource.type)}
                  <div className="flex-1">
                    <CardTitle className="text-lg line-clamp-2">{resource.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{resource.description}</CardDescription>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className={getTypeColor(resource.type)}>
                  {resource.type}
                </Badge>
                <Badge variant={resource.isPublic ? "default" : "secondary"}>
                  {resource.isPublic ? "Public" : "Private"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-muted-foreground">
                <p>{resource.class}</p>
                <p>Uploaded: {new Date(resource.uploadDate).toLocaleDateString()}</p>
                {resource.size && <p>Size: {resource.size}</p>}
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-1">
                  <Download className="h-4 w-4 text-muted-foreground" />
                  <span>{resource.downloads} downloads</span>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <Eye className="mr-2 h-4 w-4" />
                  Preview
                </Button>
                <Button size="sm" variant="outline">
                  <Share className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Upload Area */}
      <Card className="border-dashed border-2">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="text-center space-y-4">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Plus className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Upload New Resource</h3>
              <p className="text-muted-foreground">
                Drag and drop files here, or click to browse
              </p>
            </div>
            <Button>
              Choose Files
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}