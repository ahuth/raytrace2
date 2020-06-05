# Raytrace 2

Follow-up to https://github.com/ahuth/raytrace, this implements a raytracer by following [Raytracing in One Weekend](https://raytracing.github.io/books/RayTracingInOneWeekend.html), by Peter Shirley.

## Usage

Generate the image by running the following command:

```
yarn build
```

A git-ignored `image.ppm` file will be generated at the root of the project.

## Screenshots

These images were captured at various points in the book. Here they're listed in reverse order, so the earliest sections are at the bottom.

- [Section 13.1](https://raytracing.github.io/books/RayTracingInOneWeekend.html#wherenext?/afinalrender). The final render.

  ![section 13.1](https://user-images.githubusercontent.com/2503289/83912863-6a757d00-a723-11ea-9233-5d1e1db4de51.jpg)

- [Section 12.2](https://raytracing.github.io/books/RayTracingInOneWeekend.html#defocusblur/generatingsamplerays). Add a depth of field effect.

  ![section 12.2](https://user-images.githubusercontent.com/2503289/83910696-dbb33100-a71f-11ea-8b3e-5554a817ed84.jpg).

- [Section 11.1](https://raytracing.github.io/books/RayTracingInOneWeekend.html#positionablecamera/positioningandorientingthecamera). Add the ability to move the camera around, and point it at different directions and angles.

  ![section 11.1](https://user-images.githubusercontent.com/2503289/83903293-b9ff7d00-a712-11ea-812a-91412a280304.jpg)

- [Section 10.5](https://raytracing.github.io/books/RayTracingInOneWeekend.html#dielectrics/modelingahollowglasssphere). Use two glass spheres to create a hollow sphere.

  ![section 10.5](https://user-images.githubusercontent.com/2503289/83899494-676f9200-a70d-11ea-8bbf-b2813dabbc67.jpg)

- [Section 10.2](https://raytracing.github.io/books/RayTracingInOneWeekend.html#dielectrics/snell'slaw). Add glass as a material.

  ![section 10.2](https://user-images.githubusercontent.com/2503289/83892204-296d7080-a703-11ea-8282-4446ad9c8265.jpg)

- [Section 9.6](https://raytracing.github.io/books/RayTracingInOneWeekend.html#metal/fuzzyreflection). Add "fuzziness" to reflections off of metal spheres.

  ![section 9.6](https://user-images.githubusercontent.com/2503289/83795982-2320bb00-a655-11ea-8c7f-0e59e6a92f15.jpg)

- [Section 9.5](https://raytracing.github.io/books/RayTracingInOneWeekend.html#metal/ascenewithmetalspheres). Add metal spheres that reflect light.

  ![section 9.5](https://user-images.githubusercontent.com/2503289/83792080-6bd57580-a64f-11ea-8412-e01fac3bd059.jpg)

- [Section 8.3](https://raytracing.github.io/books/RayTracingInOneWeekend.html#diffusematerials/usinggammacorrectionforaccuratecolorintensity). Use gamma correction to get correct color intensities.

  ![section 8.3](https://user-images.githubusercontent.com/2503289/83712481-c41e6000-a5da-11ea-80fb-3ef032bf734c.jpg)

- [Section 8.2](https://raytracing.github.io/books/RayTracingInOneWeekend.html#diffusematerials/limitingthenumberofchildrays). Add diffuse materials. These are matte and light bounces off of them in random directions.

  ![section 8.2](https://user-images.githubusercontent.com/2503289/83711114-2ecd9c80-a5d7-11ea-97fe-3305c66a5b15.jpg)

- [Section 7.2](https://raytracing.github.io/books/RayTracingInOneWeekend.html#antialiasing/generatingpixelswithmultiplesamples). Average together multiple samples for each pixel, resulting in a smoother looking image.

  ![section 7.2](https://user-images.githubusercontent.com/2503289/83669820-074ee380-a587-11ea-9a06-0a2b62016543.jpg)

- [Section 6.7](https://raytracing.github.io/books/RayTracingInOneWeekend.html#surfacenormalsandmultipleobjects/commonconstantsandutilityfunctions). Add a second sphere representing the ground.

  ![section 6.7](https://user-images.githubusercontent.com/2503289/83665687-9e646d00-a580-11ea-9234-baa33aed90d2.jpg)

- [Section 6.1](https://raytracing.github.io/books/RayTracingInOneWeekend.html#surfacenormalsandmultipleobjects/shadingwithsurfacenormals). Shade the surface of a sphere.

  ![section 6.1](https://user-images.githubusercontent.com/2503289/83639107-0e61fb80-a55f-11ea-935d-63e11558e0b6.jpg)

- [Section 5.2](https://raytracing.github.io/books/RayTracingInOneWeekend.html#addingasphere/creatingourfirstraytracedimage). Actually draw a ray-traced sphere!

  ![section 5.2](https://user-images.githubusercontent.com/2503289/83577232-948f2b00-a4e8-11ea-85c1-67be7814eda4.jpg)

- [Section 4.2](https://raytracing.github.io/books/RayTracingInOneWeekend.html#rays,asimplecamera,andbackground/sendingraysintothescene). Send rays into a scene and use them to draw a blue gradient.

  ![section 4.2](https://user-images.githubusercontent.com/2503289/83577173-6a3d6d80-a4e8-11ea-84d6-43b9aa24e657.jpg)

- [Section 3](https://raytracing.github.io/books/RayTracingInOneWeekend.html#thevec3class). Draw a color gradient.

  ![section 3](https://user-images.githubusercontent.com/2503289/83569596-96052700-a4d9-11ea-8a87-c023aa291035.jpg)
