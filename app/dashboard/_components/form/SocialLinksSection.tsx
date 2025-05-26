import { useResume } from "@/context/ResumeContext";
import { Facebook, Github, Globe, Instagram, Linkedin, Plus, Trash2 } from "lucide-react";

const SocialLinksSection = () => {
  const { resumeData, addSocialLink, updateSocialLink, removeSocialLink } = useResume();
  const { socialLinks } = resumeData;

  const handleChange = (id: string, field: string, value: string) => {
    updateSocialLink(id, field, value);
  };

  // Function to determine which icon to display based on platform
  const getPlatformIcon = (platform: string) => {
    const normalizedPlatform = platform.toLowerCase();

    if (normalizedPlatform.includes('linkedin')) {
      return <Linkedin className="h-4 w-4 text-blue-600" />;
    } else if (normalizedPlatform.includes('github')) {
      return <Github className="h-4 w-4 text-gray-800" />;
    } else if (normalizedPlatform.includes('instagram')) {
      return <Instagram className="h-4 w-4 text-gray-800" />;
    } else if (normalizedPlatform.includes('facebook')) {
      return <Facebook className="h-4 w-4 text-gray-800" />;
    } else {
      return <Globe className="h-4 w-4 text-green-600" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-900">Social Links</h2>
        <button
          onClick={addSocialLink}
          className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add
        </button>
      </div>

      {socialLinks.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">No social links added yet.</p>
          <button
            onClick={addSocialLink}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Link
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {socialLinks.map((link) => (
            <div key={link.id} className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                {getPlatformIcon(link.type)}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 flex-grow">
                <input
                  type="text"
                  value={link.type}
                  onChange={(e) => handleChange(link.id, 'platform', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Platform (e.g., LinkedIn)"
                />

                <input
                  type="url"
                  value={link.url}
                  onChange={(e) => handleChange(link.id, 'url', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="URL"
                />
              </div>

              <button
                onClick={() => removeSocialLink(link.id)}
                className="flex-shrink-0 text-gray-400 hover:text-red-500 focus:outline-none"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SocialLinksSection
